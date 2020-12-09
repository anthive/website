<template>
  <section class="game page-wrap">
    <v-container>
      <template v-if="isGameAvailable">
        <div class="mx-auto">
          <AntHivePageHeader
            :title="`${$t('game.game')} #${gameId}`"
            :tooltip-text="$t('game.gameId')"
          />
        </div>
        <v-row class="mx-auto">
          <v-col cols="12" md="8" class="player-wrap">
            <GamePlayer :is-game-end="isGameEnd"  @replay="replay" />
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
        <h3 class="mt-10 mb-0">{{ $t('game.moreGames') }}:</h3>
      </template>

      <template v-else>
        <AntHivePageHeader
          :title="`${$t('game.cantFindGame')} #${gameId}`"
          :tooltip-text="$t('game.gameId')"
        />
        <h3 class="mt-10 mb-0">{{ $t('game.checkOut') }}:</h3>
      </template>
      <GamesTable :games-limit="5" />
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
    players: [],
    isGameEnd: false,
    gameLoaded: false,
    gameId: '',
    gamePlayer: null,
    timerId: null
  }),
  components: {
    AntHiveBotHorizontal,
    GamePlayer,
    GamesTable,
    AntHivePageHeader
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
          this.gamePlayer = new AnthivePlayer('#player', dataUrl)
          // eslint-disable-next-line
          this.gamePlayer.on(AnthivePlayer.event.READY, async () => {
            this.gameLoaded = true
          })
          // eslint-disable-next-line
          this.gamePlayer.on(AnthivePlayer.event.END, () => {
            this.isGameEnd = true
          })
          let players = []
          this.timerId = setInterval(() => (this.players = players), 1000)
          // eslint-disable-next-line
          this.gamePlayer.on(AnthivePlayer.event.TICK, data => {
            players = data.bots || []
          })
        } else {
          this.isGameAvailable = false
          this.$gtag('event', 'notfound', { event_category: 'game', value: this.gameId })
        }
      })
    },
    gamePlayerDestroy() {
      if (this.gamePlayer) {
        this.players = []
        this.gamePlayer.removeAllListeners()
        this.gamePlayer.container.innerHTML = ''
        this.gamePlayer = null
      }
      if (this.timerId) clearInterval(this.timerId)
    },
    getAvatar(id) {
      return `${process.env.API_URL}/images/${id}/100/100`
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
</style>
