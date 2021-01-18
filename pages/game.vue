<template>
  <section :class="{ debug: isDebugMode }" class="game page-wrap">
    <v-container>
      <template v-if="isGameAvailable">
        <v-row>
          <v-col class="mx-auto">
            <AntHivePageHeader
              :title="`${$t('game.game')} #${gameId}`"
              :tooltip-text="$t('game.gameId')"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="8">
            <GamePlayer
              :tooltip-content="tooltipContent"
              :is-game-end="isGameEnd"
              :bots="bots"
              :responses="responses"
              :requests="requests"
              class="player-wrap"
              @replay="replay"
            />
            <v-card
              v-if="isGameStoped && isDebugMode && gameTooltip"
              class="tooltip"
              tile
            >x: <span>{{ gameTooltip.x }}</span>
              y: <span>{{ gameTooltip.y }}</span>
              food: <span>{{ gameTooltip.food ? gameTooltip.food : 0 }}</span>
              id: <span>{{ gameTooltip.id }}</span>
            </v-card>
            <GameDebugPanel
              v-if="bots && isDebugMode"
              :is-game-stoped="isGameStoped"
              :requests="requests"
              :responses="responses"
              :bots="bots"
              class="debug-panel"
            />
          </v-col>

          <v-col cols="12" md="4">
            <transition-group name="flip-list" tag="div">
              <div
                v-for="(bot, index) in game.bots"
                :key="bot.spawn"
              >
                <AntHiveBotHorizontal
                  v-if="bot.stats"
                  :bot="bot"
                  :stats="bot.stats"
                  :is-dead="bot.isDead"
                  :number="index + 1"
                  class="mb-2"
                />
                <v-skeleton-loader
                  v-else
                  tile
                  type="list-item-avatar-three-line"
                  class="mb-2"
                />
              </div>
            </transition-group>
          </v-col>
        </v-row>
        <h3 v-if="!isDebugMode" class="mt-10 mb-0">
          {{ $t("game.moreGames") }}:
        </h3>
        <GamesTable v-if="!isDebugMode" :games-limit="5" />
      </template>

      <div v-else class="game-not-found">
        <AntHivePageHeader
          :title="`${$t('game.cantFindGame')} #${gameId}`"
          :tooltip-text="$t('game.gameId')"
        />
        <h3 class="mt-10 mb-2">{{ $t("game.checkOut") }}:</h3>
        <div class="games-links">
          <a :href="`${localePath('game')}?id=NpKu1B1jOwtTqf&v=5.0`">
            <img class="game-image" src="img/game1.png" alt="game">
          </a>
          <a :href="`${localePath('game')}?id=ncdffi2vxJ5JKP&v=5.0`">
            <img class="game-image" src="img/game2.png" alt="game">
          </a>
          <a :href="`${localePath('game')}?id=mNXLxQdA6ulUX5&v=5.0`">
            <img class="game-image" src="img/game3.png" alt="game">
          </a>
        </div>
        <a :href="localePath('games')" class="link">{{ $t('game.goToGames') }}</a>
      </div>
    </v-container>
  </section>
</template>

<script>
import AntHiveBotHorizontal from '@/components/AntHiveBotHorizontal'
import GamePlayer from '@/components/GamePlayer'
import GameDebugPanel from '@/components/GameDebugPanel'
import GamesTable from '@/components/GamesTable'
import AntHivePageHeader from '@/components/AntHivePageHeader'
import Image from '@/mixins/image'
import AntHiveIcon from '@/components/AntHiveIcon'

import { getGame } from '@/services/Game'

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
  components: {
    AntHiveBotHorizontal,
    GamePlayer,
    GameDebugPanel,
    GamesTable,
    AntHivePageHeader,
    AntHiveIcon
  },
  mixins: [Image],
  data: () => ({
    isGameAvailable: true,
    theme: 1,
    tab: 0,
    bots: [],
    isGameEnd: false,
    gameLoaded: false,
    gameId: '',
    gamePlayer: null,
    timerId: null,
    tooltipContent: null,
    requests: [],
    responses: [],
    fetchPlayerDataTimerId: '',
    isDebugMode: false,
    isGameStoped: false,
    gameTooltip: '',
    game: {}
  }),
  watch: {
    $route() {
      this.gamePlayerDestroy()
      this.fetchGame()
    },
    bots(value) {
      if (!value || !value.length) { return }
      this.game.bots = this.game.bots.map((bot) => {
        const gameBot = value.find(gameBot => gameBot.id === bot.spawn)
        bot.isDead = !gameBot
        if (gameBot) { bot.stats = gameBot.stats }
        return bot
      })

      this.game.bots.sort(this.compare)
    }
  },
  mounted() {
    this.fetchGame()
  },
  destroyed() {
    this.gamePlayerDestroy()
  },
  methods: {
    async fetchGame() {
      try {
        this.gameId = this.$route.query.id || ''
        this.game = await getGame(this.$route.query.id)
        this.fetchPlayer()
      } catch {
        this.isGameAvailable = false
        this.$gtag('event', 'Not found game', { event_category: 'game', value: this.gameId })
      }
    },
    fetchPlayer() {
      import(`../static/js/anthive-${process.env.SIM_VERSION}.js`).then(() => {
        const version = this.$route.query.v || ''
        const dataUrl = `${process.env.GAMES_STORAGE}/${version}/${this.gameId}.zip`
        const apiImagesUrl = `${process.env.API_URL}/public/images`
        const assetsUrl = `${process.env.WEBSITE_URL}/skins`
        // eslint-disable-next-line
        this.gamePlayer = new AnthivePlayer('#player', apiImagesUrl, assetsUrl, dataUrl)
        // eslint-disable-next-line
        this.gamePlayer.on(AnthivePlayer.event.READY, async () => {
          this.gameLoaded = true
        })
        // eslint-disable-next-line
        this.gamePlayer.on(AnthivePlayer.event.END, () => {
          this.isGameEnd = true
        })
        let bots = []
        this.fetchPlayerDataTimerId = setInterval(() => {
          this.bots = bots
        }, 1000)
        // eslint-disable-next-line
        this.gamePlayer.on(AnthivePlayer.event.TICK, data => {
          bots = data.bots || []
          if (this.isDebugMode) {
            this.responses = data.responses
            this.requests = data.requests
          }
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
      })
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
    gamePlayerDestroy() {
      this.game = {}
      if (this.gamePlayer) {
        this.bots = []
        this.gamePlayer = this.gamePlayer.clearPlayerState()
      }
      if (this.fetchPlayerDataTimerId) { clearInterval(this.fetchPlayerDataTimerId) }
    },
    replay() {
      this.gamePlayer.control.frame = 0
      this.gamePlayer.control.play()
      this.isGameEnd = false
    },
    compare(a, b) {
      if (!a.stats || !b.stats) { return 0 }
      if (a.stats.score < b.stats.score) { return 1 }
      if (a.stats.score > b.stats.score) { return -1 }
      return 0
    },
    showActions() {
      this.showActionsState = !this.showActionsState
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/style/global.scss';
.tab-content {
  &::-webkit-scrollbar {
    width: 15px;
    background: $lilac;
  }
  &::-webkit-scrollbar-thumb {
    border: 5px solid $lilac;
    background: $violet-light;
  }
}
.v-content__wrap {
  background: $white;
}
.player-wrap {
  width: 100%;
  padding: 10px 0 0;
}
.debug-panel .v-tabs-slider-wrapper {
  display: none;
}
</style>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';
.game {
  height: 100%;
  overflow-x: hidden;
  &.debug {
    margin-bottom: 330px;
  }
  .debug-panel {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 4;
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
