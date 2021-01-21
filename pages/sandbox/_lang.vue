<template>
  <section class="sandbox page-wrap">
    <v-row class="px-2">
      <v-col class="pa-0" cols="12">
        <div v-if="isGameAvailable" class="pa-3 pb-10" min-height="calc(100vh - 64px)">
          <AntHivePageHeader
            :title="$t('sandbox.sandbox')"
            :tooltip-text="$t('sandbox.tooltipText')"
          />
          <v-row>
            <v-col class="sandbox__content" cols="12" md="6">
              <editor :value-code.sync="valueCode" />
            </v-col>
            <v-col cols="12" md="6">
              <div v-show="isGameRunned" :class="{ disable: loading }" class="sandbox__player">
                <template v-if="!isGamePlaying">
                  <v-skeleton-loader
                    class="skeleton"
                    tile
                    type="image, image, list-item"
                  />
                  <div class="sandbox__loading-text">
                    <h4>{{ $t("sandbox.loading") }}</h4>
                    <transition name="fade" mode="out-in">
                      <p v-if="loadingText">{{ $t(`sandbox.${loadingText}`) }}</p>
                    </transition>
                  </div>
                </template>
                <div id="player" class="player" />
              </div>
              <v-card
                v-if="isGameStoped && isDebugMode && gameTooltip"
                class="tooltip"
                tile
              >x: <span>{{ gameTooltip.x }}</span> y:
                <span>{{ gameTooltip.y }}</span> food:
                <span>{{ gameTooltip.food ? gameTooltip.food : 0 }}</span> id:
              <span>{{ gameTooltip.id }}</span></v-card
              >
              <div class="sandbox__actions">
                <AntHiveButton
                  :loading="loading"
                  :disabled="!isCodeChanged"
                  :light="!isCodeChanged"
                  fill
                  tile
                  class="action-button"
                  color="green"
                  @click="onClickRun"
                >
                  {{ $t("sandbox.runSandbox") }}
                </AntHiveButton>
                <AntHiveButton
                  :disabled="!gameId"
                  fill
                  tile
                  light
                  class="action-button"
                  color="accent"
                  @click="onClickLogin"
                >
                  <span v-if="getUser && getUser.userName">{{ $t("sandbox.save") }}</span>
                  <span v-else> {{ $t("sandbox.loginToSave") }}</span>
                </AntHiveButton>
              </div>
              <div v-if="!isDebugMode && !simLogs && !botLogs">
                <p class="sandbox__description">{{ $t("sandbox.description") }}</p>
                <p v-html="getHelpElement" />
              </div>
            </v-col>
          </v-row>
          <GameDebugPanel
            v-if="bots && isDebugMode"
            :is-game-stoped="isGameStoped"
            :requests="requests"
            :responses="responses"
            :sim-logs="simLogs"
            :sandbox-bot-logs="botLogs"
            :bots="bots" />
        </div>
        <div v-else class="pa-3 game-not-found">
          <AntHivePageHeader :title="$t('sandbox.cantFindSandboxGame')" />
          <h3 class="mt-10 mb-2">{{ $t("sandbox.checkOut") }}:</h3>
          <div class="games-links">
            <nuxt-link
              v-for="lang in getAllLangs"
              :key="lang.id"
              :to="`${localePath('sandbox')}/${lang.extention}`"
              class="link"
            >
              <v-avatar tile size="60" class="ml-2">
                <v-img :src="lang.img" />
              </v-avatar>
            </nuxt-link>
          </div>
        </div>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import md5 from 'md5'
import { mapGetters } from 'vuex'
import axios from 'axios'
import Fire from '@/plugins/firebase'
import langs from '@/static/langs/data.json'
import editor from '@/components/SandboxEditor.vue'
import AntHivePageHeader from '@/components/AntHivePageHeader'
import GameDebugPanel from '@/components/GameDebugPanel'
export default {
  head() {
    return {
      title: this.$t('sandbox.meta.title'),
      meta: [
        {
          name: 'description',
          content: this.$t('sandbox.meta.description')
        }
      ]
    }
  },
  components: {
    editor,
    AntHivePageHeader,
    GameDebugPanel
  },
  data: () => ({
    valueCode: {},
    simLogs: '',
    botLogs: '',
    tab: 0,
    loading: false,
    listOfLoadingText: ['loadingText1', 'loadingText2', 'loadingText3', 'loadingText4', 'loadingText5'],
    loadingText: '',
    savedCode: '',
    gameId: '',
    gamePlayer: null,
    responses: [],
    requests: [],
    bots: [],
    gameTooltip: {},
    isGameStoped: false,
    isDebugMode: false,
    fetchPlayerDataTimerId: null,
    timerId: null,
    isGameRunned: false,
    isGameAvailable: true,
    isGamePlaying: false,
    isGameInQueue: false
  }),
  computed: {
    ...mapGetters(['getUser']),
    isCodeChanged() {
      return this.valueCode.value !== this.savedCode
    },
    getAllLangs() {
      return langs
    },
    getHelpElement() {
      const rulesElement = `
        <a
          class="accent--text"
          onClick="$gtag('event', 'redirect', { event_category: 'rules', event_label: 'fromSandbox' })"
          href="/rules"
        >${this.$t('header.rules')}</a>
      `
      const discordElement = '<a class="accent--text" target="_blank" href="https://discord.gg/3Z7KvYv">Discord</a>'
      return this.$t('sandbox.descriptionHelp', { rules: rulesElement, discord: discordElement })
    },
    getGameUrl() {
      return `${process.env.SANDBOX_STORAGE}/${process.env.SIM_VERSION}/${this.gameId}.zip`
    }
  },
  watch: {
    $route() {
      this.isGameAvailable = true
    }
  },
  async mounted() {
    await import('../../static/js/anthive-5.0.js')
    if (this.$route.query.box) {
      this.gameId = this.$route.query.box
      this.loading = true
      this.showLoadingText()
      try {
        await axios.get(this.getGameUrl)
        this.isGameRunned = true
        this.initGame()
        this.initLogs()
      } catch {
        this.isGameAvailable = false
      } finally {
        this.loading = false
      }
    }
  },
  destroyed() {
    if (this.gamePlayer) { this.gamePlayerDestroy() }
    if (this.timerId) { clearInterval(this.timerId) }
  },
  methods: {
    handlerClickLogs(logsCategory) {
      this.$gtag('event', 'Sim logs', { event_category: 'game', value: logsCategory })
    },
    showLoadingText(i = 0) {
      if (!this.loading) {
        this.loadingText = ''
        return
      }
      if (i >= this.listOfLoadingText.length) { return }
      setTimeout(() => {
        this.loadingText = ''
        this.$nextTick(() => {
          this.loadingText = this.listOfLoadingText[i]
          this.showLoadingText(i + 1)
        })
      }, 3000)
    },
    async onClickRun() {
      if (this.gamePlayer) { this.gamePlayerDestroy() }
      this.savedCode = this.valueCode.value
      this.$gtag('event', 'Run Sandbox', { event_category: 'sandbox' })

      this.gameId = md5(this.savedCode)
      this.$router.push({ path: this.$route.path, query: { box: this.gameId } })
      await this.getGame()
    },
    async getGame() {
      try {
        this.isGamePlaying = false
        this.isGameRunned = true
        await axios.head(this.getGameUrl)
        this.initGame()
        this.initLogs()
      } catch {
        this.loading = true
        this.showLoadingText()
        await this.sendCodeToSim()

        if (this.gamePlayer && this.gamePlayer.control) {
          this.gamePlayer.control.stop()
        }
        this.botLogs = this.simLogs = 'Loading...'

        const sandboxRef = Fire.database().ref('sandbox')
        sandboxRef.on('value', async(snapshot) => {
          const games = snapshot.val() ? Object.values(snapshot.val()) : []
          const hasGame = games.findIndex(game => game.sum === this.gameId) !== -1

          if (this.isGameInQueue && !hasGame) {
            this.loading = false
            sandboxRef.off()

            const isGameExist = await axios.head(this.getGameUrl)
            if (!isGameExist) {
              // TODO: Handle this error
              return
            }

            this.initGame()
            this.initLogs()
            return
          }

          this.isGameInQueue = hasGame
        })
      }
    },
    onClickLogin() {
      this.$gtag('event', 'Get started Sandbox', { event_category: 'getstarted', event_label: 'sandbox' })
      const createBotUrl = `${process.env.PROFILE_URL}/create-bot?box=${this.gameId}&lang=${this.$route.params.lang}`
      window.location.href = createBotUrl
    },
    async sendCodeToSim() {
      const url = `${process.env.API_URL}/public/sandbox/${this.valueCode.extention}/${this.gameId}`
      const simResp = await axios.post(url, this.savedCode)
      return simResp.data
    },
    initGame() {
      this.isGameStoped = false
      this.isDebugMode = false
      const apiImagesUrl = `${process.env.API_URL}/public/images`
      const assetsUrl = `${process.env.WEBSITE_URL}/skins`
      // eslint-disable-next-line
      this.gamePlayer = new AnthivePlayer('#player', apiImagesUrl, assetsUrl, this.getGameUrl)
      let bots = []
      this.fetchPlayerDataTimerId = setInterval(() => {
        this.bots = bots
      }, 1000)
      // eslint-disable-next-line
      this.gamePlayer.on(AnthivePlayer.event.READY, async () => {
        this.isGamePlaying = true
        this.gamePlayer.control._toggleDebugMode()
      })
      // eslint-disable-next-line
      this.gamePlayer.on(AnthivePlayer.event.TICK, data => {
        bots = data.bots || []
        if (this.isDebugMode) {
          this.responses = data.responses
          this.requests = data.requests
        }
      })
      // eslint-disable-next-line
      this.gamePlayer.on(AnthivePlayer.event.DEBUG, data => {
        this.isDebugMode = data
      })
      // eslint-disable-next-line
      this.gamePlayer.on(AnthivePlayer.event.STOP, () => {
        this.isGameStoped = true
        this.gamePlayer.container.addEventListener('mousemove', this.gameSetTooltipCoords)
      })
      // eslint-disable-next-line
      this.gamePlayer.on(AnthivePlayer.event.PLAY, () => {
        this.isGameStoped = false
        this.gamePlayer.container.removeEventListener('mousemove', this.gameSetTooltipCoords)
      })
    },
    gamePlayerDestroy() {
      if (this.gamePlayer) {
        this.bots = []
        this.gamePlayer = this.gamePlayer.clearPlayerState()
      }
      if (this.fetchPlayerDataTimerId) { clearInterval(this.fetchPlayerDataTimerId) }
    },
    gameSetTooltipCoords(event) {
      if (event.target.localName !== 'canvas') { return }
      const gameTooltipCoords = {
        x: Math.floor(event.offsetX / this.gamePlayer.renderer._size),
        y: Math.floor(event.offsetY / this.gamePlayer.renderer._size)
      }

      const tooltip = this.gamePlayer.framer.getCellTooltip(gameTooltipCoords.x, gameTooltipCoords.y)
      this.gameTooltip = { x: gameTooltipCoords.x, y: gameTooltipCoords.y, ...tooltip }
    },
    async initLogs() {
      this.botLogs = await this.getLogs(this.gameId, 'bot')
      this.simLogs = await this.getLogs(this.gameId, 'sim')
    },
    async getLogs(id, type) {
      const logsUrl = `${process.env.SANDBOX_STORAGE}/${process.env.SIM_VERSION}/${id}-${type}.txt`
      const resp = await axios.get(logsUrl)
      return resp.data
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/global.scss';
.skeleton {
  width: 100%;
  height: Calc(100% * 9 / 16);
}

.sandbox {
  overflow: hidden;
  height: 100%;
  &__content {
    position: relative;
  }
  &__player {
    position: relative;
    min-height: 300px;
    &.disable {
      min-height: 300px;
    }
    .player {
      width: 100%;
      z-index: 10;
    }
  }
  &__description {
    white-space: pre-line;
  }
  &__actions {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 20px;

    .action-button {
      width: 49%;
    }
  }
  &__loading-text {
    position: absolute;
    z-index: 1;
    top: 50%;
    text-align: center;
    left: 50%;
    transform: translate(-50%, -50%);
    & > * {
      color: $white;
    }
  }
  &__content-logs-wrap {
    overflow-y: scroll;
    max-height: 420px;
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }

  .game-not-found {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .game-image {
    margin: 0 5px;
    border: 2px solid $violet;
    border-radius: 2px;
    transform: scale(0.98);
    transition: 0.2s;
    &:hover {
      transform: scale(1.02);
    }
  }
  .link {
    display: inline-block;
    text-decoration: underline;
    margin-top: 10px;
    &:hover {
      text-decoration: none !important;
    }
  }
}

.tooltip {
  box-shadow: none !important;
  border-radius: 0 !important;
  color: $violet;
  padding: 10px;
  background-color: $lilac;
  display: flex;
  & span {
    display: block;
    min-width: 25px;
    font-weight: 600;
    margin-right: 10px;
  }
}
</style>
