<template>
  <section :class="{ debug: isDebugMode }" class="game page-wrap">
    <v-container>
      <template v-if="isGameAvailable">
        <div class="mx-auto">
          <AntHivePageHeader
            :title="`${$t('game.game')} #${gameId}`"
            :tooltip-text="$t('game.gameId')"
          />
        </div>
        <v-row class="mx-auto">
          <v-col cols="12" md="8">
            <GamePlayer
              class="player-wrap"
              :tooltip-content="tooltipContent"
              :is-game-end="isGameEnd"
              @replay="replay"
              :bots="players"
              :responses="responses"
              :requests="requests"
              :is-debug-mode="isDebugMode"
              :is-game-stoped="isGameStoped"
            />
            <v-card
              class="pa-2"
              tile
              v-if="isGameStoped && isDebugMode && gameTooltip"
              >{{ gameTooltip }}</v-card
            >
            <div class="debug-panel" v-if="getBots && isDebugMode">
              <v-tabs v-model="tab" background-color="primary" dark>
                <v-tab v-for="(bot, index) in getBots" :key="index" class="tab"
                  >{{ bot.displayName }} {{ bot.id }}</v-tab
                >
              </v-tabs>

              <v-tabs-items v-model="tab">
                <div v-for="(bot, index) in getBots" :key="index + 10">
                  <v-tab-item :transition="false" :reverse-transition="false">
                    <div class="d-flex">
                      <div class="tab-content">
                        <AntHiveButton
                          v-if="isGameStoped"
                          @click="
                            downloadRequest(
                              getResponseRequest(bot, 'requests'),
                              bot.id
                            )
                          "
                          x-large
                          class="accent"
                          >Download request</AntHiveButton
                        >
                        <div>{{ getResponseRequest(bot, "requests") }}</div>
                      </div>
                      <div class="tab-content">
                        <div>
                          <pre>{{ getResponseRequest(bot, "responses") }}</pre>
                        </div>
                      </div>
                    </div>
                  </v-tab-item>
                </div>
              </v-tabs-items>
            </div>
          </v-col>

          <v-col cols="12" md="4">
            <transition-group name="flip-list" tag="div">
              <AntHiveBotHorizontal
                class="my-2"
                :key="player.id"
                v-for="(player, index) in players"
                :player="player"
                :number="index + 1"
              />
            </transition-group>
          </v-col>
        </v-row>
        <h3 v-if="!isDebugMode" class="mt-10 mb-0">
          {{ $t("game.moreGames") }}:
        </h3>
      </template>

      <template v-else>
        <AntHivePageHeader
          :title="`${$t('game.cantFindGame')} #${gameId}`"
          :tooltip-text="$t('game.gameId')"
        />
        <h3 class="mt-10 mb-0">{{ $t("game.checkOut") }}:</h3>
      </template>
      <GamesTable v-if="!isDebugMode" :games-limit="5" />
    </v-container>
  </section>
</template>

<script>
import AntHiveBotHorizontal from '@/components/AntHiveBotHorizontal'
import GamePlayer from '@/components/GamePlayer'
import GamesTable from '@/components/GamesTable'
import AntHivePageHeader from '@/components/AntHivePageHeader'

export default {
  head() {
    return {
      title: this.$t('game.meta.title'),
      meta: [
        {
          name: 'description',
          content: this.$t('game.meta.description')
        }
      ]
    }
  },
  data: () => ({
    isGameAvailable: true,
    theme: 1,
    tab: 0,
    players: [],
    isGameEnd: false,
    gameLoaded: false,
    gameId: '',
    gamePlayer: null,
    timerId: null,
    tooltipContent: null,
    requests: null,
    responses: null,
    fetchPlayerDataTimerId: '',
    isDebugMode: false,
    isGameStoped: false,
    gameTooltip: ''
  }),
  components: {
    AntHiveBotHorizontal,
    GamePlayer,
    GamesTable,
    AntHivePageHeader
  },
  computed: {
    getBots() {
      if (this.players && this.players.length) {
        const bots = this.players
        return bots.sort((a, b) => {
          if (a.id > b.id) {
            return 1
          }
          if (a.id < b.id) {
            return -1
          }
          return 0
        })
      }
      return []
    }
  },
  watch: {
    $route() {
      this.gamePlayerDestroy()
      this.fetchGame()
    }
  },
  mounted() {
    this.fetchGame()
  },
  methods: {
    fetchGame() {
      import(`../static/js/anthive-${process.env.SIM_VERSION}.js`).then(() => {
        this.gameId = this.$route.query.id || ''
        const version = this.$route.query.v || ''
        const dataUrl = `${process.env.GAMES_STORAGE}/${version}/${this.gameId}.zip`
        if (this.isGameFound(dataUrl)) {
          // eslint-disable-next-line
          this.gamePlayer = new AnthivePlayer('#player', `${process.env.API_URL}/public/images`, dataUrl)
          // eslint-disable-next-line
          this.gamePlayer.on(AnthivePlayer.event.READY, async () => {
            this.gameLoaded = true
          })
          // eslint-disable-next-line
          this.gamePlayer.on(AnthivePlayer.event.END, () => {
            this.isGameEnd = true
          })
          let players = []
          let requests = []
          let responses = []
          this.fetchPlayerDataTimerId = setInterval(() => {
            this.players = players
            this.responses = responses
            this.requests = requests
          }, 1000)
          // eslint-disable-next-line
          this.gamePlayer.on(AnthivePlayer.event.TICK, data => {
            requests = data.requests || []
            responses = data.responses || []
            players = data.bots || []
          })
          // eslint-disable-next-line
          this.gamePlayer.on(AnthivePlayer.event.TOOLTIP, data => {
            this.tooltipContent = data
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
        } else {
          this.isGameAvailable = false
          this.$gtag('event', 'Not found game', { event_category: 'game', value: this.gameId })
        }
      })
    },
    gameSetTooltipCoords(event) {
      if (event.target.localName !== 'canvas') return
      const gameTooltipCoords = {
        x: Math.floor(event.offsetX / this.gamePlayer.renderer.size),
        y: Math.floor(event.offsetY / this.gamePlayer.renderer.size)
      }

      const tooltip = this.gamePlayer.framer.getCellTooltip(gameTooltipCoords.x, gameTooltipCoords.y)
      this.gameTooltip = `${gameTooltipCoords.x}:${gameTooltipCoords.y} ${JSON.stringify(tooltip)}`
    },

    gamePlayerDestroy() {
      if (this.gamePlayer) {
        this.players = []
        this.gamePlayer.removeAllListeners()
        this.gamePlayer.container.innerHTML = ''
        this.gamePlayer = null
      }
      if (this.fetchPlayerDataTimerId) clearInterval(this.fetchPlayerDataTimerId)
    },
    isGameFound(url) {
      const request = new XMLHttpRequest()
      request.open('HEAD', url, false)
      request.send()
      return request.status !== 404
    },
    replay() {
      this.gamePlayer.control.frame = 0
      this.gamePlayer.control.play()
      this.isGameEnd = false
    },
    compare(a, b) {
      if (a.Wealth < b.Wealth) return 1
      if (a.Wealth > b.Wealth) return -1
      return 0
    },
    showActions() {
      this.showActionsState = !this.showActionsState
    },
    getResponseRequest(bot, type) {
      if (this[type] && this[type].length) {
        return JSON.stringify(this[type].find(r => r.id === bot.id), null, 2)
      }
    },
    downloadRequest(request, id) {
      const a = document.createElement('a')
      const data = JSON.stringify(request)
      a.href = URL.createObjectURL(new Blob([data], { type: 'application/json' }))
      a.download = `request-${id}`
      a.click()
    }
  },
  destroyed() {
    this.gamePlayerDestroy()
  }
}
</script>

<style>
.v-content__wrap {
  background: #fff;
}
.player-wrap {
  width: 100%;
  padding: 10px 0 0;
}
</style>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';
.game {
  height: 100%;
  overflow-x: hidden;
  &.debug {
    margin-bottom: 250px;
  }
  // loading text animation
  .flip-list-move {
    transition: transform 0.5s;
  }
  .flip-list-enter-active,
  .flip-list-leave-active {
    transition: all 0.8s;
  }
  .flip-list-enter,
  .flip-list-leave-to {
    transform: translateX(100px);
    opacity: 0;
  }
}

.debug-panel {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1;
  .tab {
    text-transform: none;
    padding-top: 5px;
  }
  .tab-content {
    width: 40%;
    padding: 10px;
    height: 200px;
    overflow-y: auto;
    &:first-child {
      width: 60%;
      border-right: 2px solid $color-violet-700;
    }
  }
}
</style>
