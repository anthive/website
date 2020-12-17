<template>
  <section class="sandbox page-wrap">
    <v-row class="px-2">
      <v-col class="pa-0" cols="12">
        <div class="white pa-3 pb-10" min-height="calc(100vh - 64px)">
          <AntHivePageHeader
            :title="$t('sandbox.sandbox')"
            :tooltip-text="$t('sandbox.tooltipText')"
          />
          <v-row>
            <v-col class="sandbox__content" cols="12" md="6">
              <editor :valueCode.sync="valueCode" />
            </v-col>
            <v-col cols="12" md="6">
              <div class="sandbox__player" :class="{ disable: loading }">
                <div id="player" />
                  <div class="sandbox__loading-text" v-if="loading && $route.query.box">
                    <h4>{{ $t("sandbox.loading") }}</h4>
                    <transition name="fade" mode="out-in">
                      <p v-if="loadingText">{{ $t(`sandbox.${loadingText}`) }}</p>
                    </transition>
                  </div>
              </div>
               <v-card
              class="tooltip"
              tile
              v-if="isGameStoped && isDebugMode && gameTooltip"
              >x: <span>{{ gameTooltip.x }}</span> y:
              <span>{{ gameTooltip.y }}</span> food:
              <span>{{ gameTooltip.food ? gameTooltip.food : 0 }}</span> id:
              <span>{{ gameTooltip.id }}</span></v-card
            >
               <GameDebugPanel :is-game-stoped="isGameStoped"  v-if="bots && isDebugMode" :requests="requests" :responses="responses" :bots="bots" />
              <div class="sandbox__actions">
                <AntHiveButton
                  :loading="loading"
                  :disabled="!isCodeChanged"
                  fill
                  tile
                  class="action-button"
                  @click="onClickRun"
                  :light="!isCodeChanged"
                  color="green"
                >
                  {{ $t("sandbox.runSandbox") }}
                </AntHiveButton>
                <AntHiveButton
                  fill
                  tile
                  light
                  :disabled="!gameId"
                  class="action-button"
                  @click="onClickLogin"
                  color="accent"
                  >
                    <span v-if="getUser && getUser.userName">{{ $t("sandbox.save") }}</span>
                    <span v-else> {{ $t("sandbox.loginToSave") }}</span>
                  </AntHiveButton>
              </div>
              
              <div v-if="!isDebugMode && simLogs && botLogs">
                <v-tabs v-model="tab" background-color="grey darken-2" dark>
                  <v-tab @click="handlerClickLogs('bot')"> {{ $t("sandbox.bot") }} </v-tab>
                  <v-tab @click="handlerClickLogs('sim')"> {{ $t("sandbox.sim") }} </v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                  <v-tab-item>
                    <v-card class="sandbox__content-logs-wrap" flat>
                      <v-card-text>
                        <pre>{{ botLogs }}</pre>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>

                  <v-tab-item>
                    <v-card class="sandbox__content-logs-wrap" flat>
                      <v-card-text>
                        <pre>{{ simLogs }}</pre>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs-items>
              </div>
              <div v-if="!isDebugMode && !simLogs && !botLogs">
                <p class="sandbox__description">{{ $t("sandbox.description") }}</p>
                <p v-html="getHelpElement" />
              </div>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import md5 from 'md5'
import { mapGetters } from 'vuex'
import editor from '@/components/SandboxEditor.vue'
import AntHivePageHeader from '@/components/AntHivePageHeader'
import GameDebugPanel from '@/components/GameDebugPanel'
import axios from 'axios'
var player = null
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
    timerId: null
  }),
  computed: {
    ...mapGetters(['getUser']),
    isCodeChanged() {
      return this.valueCode.value !== this.savedCode
    },
    getHelpElement() {
      const rulesElement = `
        <a
          class="accent--text"
          onClick="$gtag('event', 'redirect', { event_category: 'rules', event_label: 'fromSandbox' })"
          href="/rules"
        >${this.$t('header.rules')}</a>
      `
      const discordElement = `<a class="accent--text" target="_blank" href="https://discord.gg/3Z7KvYv">Discord</a>`
      return this.$t('sandbox.descriptionHelp', { rules: rulesElement, discord: discordElement })
    }
  },
  async mounted() {
    import('../../static/js/anthive-5.0.js').then(async () => {
      if (this.$route.query.box) {
        this.gameId = this.$route.query.box
        this.loading = true
        this.showLoadingText()
        await this.getGame()
          .then(() => {
            this.initGame()
            this.initLogs()
          })
          .catch(err => {
            this.botLogs = this.simLogs = err
          })
          .finally(() => {
            this.loading = false
          })
      }
    })
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
      if (i >= this.listOfLoadingText.length) return
      setTimeout(() => {
        this.loadingText = ''
        this.$nextTick(() => {
          this.loadingText = this.listOfLoadingText[i]
          this.showLoadingText(i + 1)
        })
      }, 3000)
    },
    async onClickRun() {
      if (this.gamePlayer) this.gamePlayerDestroy()
      this.savedCode = this.valueCode.value
      this.$gtag('event', 'Run Sandbox', { event_category: 'sandbox' })

      this.gameId = md5(this.savedCode)
      const gameUrl = `${process.env.SANDBOX_STORAGE}/${process.env.SIM_VERSION}/${this.gameId}.zip`

      axios
        .head(gameUrl)
        .then(() => {
          this.initGame()
          this.initLogs()
          this.$router.push({ path: this.$route.path, query: { box: this.gameId } })
        })
        .catch(async () => {
          this.loading = true
          this.showLoadingText()
          if (player && player.control) player.control.stop()
          this.botLogs = this.simLogs = 'Loading...'

          await this.sendCodeToSim()
          await this.getGame()
            .then(() => {
              this.initGame()
              this.initLogs()
            })
            .catch(err => {
              this.botLogs = this.simLogs = err
            })
            .finally(() => {
              this.$router.push({ path: this.$route.path, query: { box: this.gameId } })
              this.loading = false
            })
        })
    },
    onClickLogin() {
      this.$gtag('event', 'Get started Sandbox', { event_category: 'getstarted', event_label: 'sandbox' })
      const createBotUrl = `${process.env.PROFILE_URL}/create-bot?box=${this.gameId}&lang=${this.$route.params.lang}`
      window.location.href = createBotUrl
    },
    async getGame() {
      return await new Promise(async (resolve, reject) => {
        const gameUrl = `${process.env.SANDBOX_STORAGE}/${process.env.SIM_VERSION}/${this.gameId}.zip`

        axios
          .head(gameUrl)
          //if got the game, then we resolve
          .then(resolve)
          .catch(() => {
            const maxTime = 60000
            const callInterval = 5000
            let passedTime = 0

            this.timerId = setInterval(async () => {
              passedTime += callInterval
              //if got 404, create calls by interval until we get 200 status and resolve,
              axios
                .head(gameUrl)
                .then(() => {
                  clearInterval(this.timerId)
                  resolve()
                })
                .catch(e => e)
              //or overcome the maximum interval, then reject
              if (passedTime >= maxTime) {
                clearInterval(this.timerId)
                reject('Please try again later')
              }
            }, callInterval)
          })
      })
    },
    async sendCodeToSim() {
      const url = `${process.env.API_URL}/public/sandbox/${this.valueCode.extention}/${this.gameId}`
      const simResp = await axios.post(url, this.savedCode)
      return simResp.data
    },
    initGame() {
      const apiImagesUrl = `${process.env.API_URL}/public/images`
      const assetsUrl = `${process.env.WEBSITE_URL}/skins`
      const gameUrl = `${process.env.SANDBOX_STORAGE}/${process.env.SIM_VERSION}/${this.gameId}.zip`
      // eslint-disable-next-line
      this.gamePlayer = new AnthivePlayer('#player', apiImagesUrl, assetsUrl, gameUrl)
      let bots = []
      let requests = []
      let responses = []
      this.fetchPlayerDataTimerId = setInterval(() => {
        this.bots = bots
        this.responses = responses
        this.requests = requests
      }, 1000)
      // eslint-disable-next-line
      this.gamePlayer.on(AnthivePlayer.event.READY, async () => {
        this.gamePlayer.control._toggleDebugMode()
      })
      // eslint-disable-next-line
      this.gamePlayer.on(AnthivePlayer.event.TICK, data => {
        requests = data.requests || []
        responses = data.responses || []
        bots = data.bots || []
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
      if (this.fetchPlayerDataTimerId) clearInterval(this.fetchPlayerDataTimerId)
    },
    gameSetTooltipCoords(event) {
      if (event.target.localName !== 'canvas') return
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
  },
  destroyed() {
    if (this.gamePlayer) this.gamePlayerDestroy()
    if (this.timerId) clearInterval(this.timerId)
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/global.scss';

.sandbox {
  overflow-x: hidden;
  height: 100%;
  &__content {
    position: relative;
  }
  &__player {
    position: relative;
    &.disable::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: $color-black;
      opacity: 0.5;
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
      color: $color-white;
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
}

.tooltip {
  box-shadow: none !important;
  border-radius: 0 !important;
  color: $color-violet-700;
  padding: 10px;
  background-color: $color-violet-450;
  display: flex;
  & span {
    display: block;
    min-width: 25px;
    font-weight: 600;
    margin-right: 10px;
  }
}
</style>
