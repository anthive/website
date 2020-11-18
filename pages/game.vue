<template>
  <section class="game page-wrap">
    <v-container>
      <template v-if="isGameAvailable">
        <div class="mx-auto">
        <ThePageHeader
          :title="`${$t('game.game')} #${gameId}`"
          :tooltip-text="$t('game.gameId')"
        />
        </div>
        <v-row class="mx-auto">
          <v-col cols="12" md="8" class="player-zone__wrap">
            <GamePlayer :isGameEnd="isGameEnd"  @replay="replay" />
          </v-col>
          <v-col cols="12" md="4" class="game__players-section">
            <div>
              <GamePlayerList :players="players" />
            </div>
          </v-col>
        </v-row>
        <h3 class="mt-10 mb-0">{{ $t('game.moreGames') }}:</h3>
        <GamesTable :games-limit="5" />
      </template>

      <div v-else class="game__game-not-found">
        <h2 class="mb-10">{{ $t('game.cantFindGame') }} #{{ gameId }}</h2>
        <p>{{ $t('game.checkOut') }}</p>
        <div class="game_games-links">
          <a :href="`${localePath('game')}?id=1596089763&v=4.0`">
            <img class="game__game-image" src="/img/game1.png" alt="game">
          </a>
          <a :href="`${localePath('game')}?id=1596616511&v=4.0`">
            <img class="game__game-image" src="/img/game2.png" alt="game">
          </a>
          <a :href="`${localePath('game')}?id=1596039187&v=4.0`">
            <img class="game__game-image" src="/img/game3.png" alt="game">
          </a>
        </div>
        <a class="game__link" :href="localePath('games')">{{ $t('game.goToGames') }}</a>
      </div>
    </v-container>
  </section>
</template>

<script>
import GameLogPanel from '@/components/GameLogPanel'
import GamePlayerList from '@/components/GamePlayerList'
import GamePlayer from '@/components/GamePlayer'
import GamesTable from '@/components/GamesTable'
import ThePageHeader from '@/components/ThePageHeader'
var player = null
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
    gameId: ''
  }),
  components: {
    GameLogPanel,
    GamePlayerList,
    GamePlayer,
    GamesTable,
    ThePageHeader
  },
  mounted() {
    import('../static/js/anthive-5.0.js').then(() => {
      const base = 'https://storage.googleapis.com/anthive-prod-games/'
      this.gameId = this.$route.query.id || ''
      const version = this.$route.query.v || ''
      const dataUrl = base + version + '/' + this.gameId + '.zip'
      if (this.isGameFound(dataUrl)) {
        // eslint-disable-next-line
        player = new AnthivePlayer('#player', dataUrl)
        // eslint-disable-next-line
        player.on(AnthivePlayer.event.READY, async () => {
          this.gameLoaded = true
        })
        // eslint-disable-next-line
        player.on(AnthivePlayer.event.END, () => {
          this.isGameEnd = true
        })
        // eslint-disable-next-line
        player.on(AnthivePlayer.event.TICK, data => {
          this.players = data.bots
        })
      } else {
        this.isGameAvailable = false
        this.$ga.event({ eventCategory: 'game', eventAction: 'notfound', eventValue: this.gameId })
      }
    })
  },
  methods: {
    getAvatar(id) {
      return `${process.env.API_URL}images/${id}/100/100`
    },
    isGameFound(url) {
      const request = new XMLHttpRequest()
      request.open('HEAD', url, false)
      request.send()
      return request.status !== 404
    },
    replay() {
      player.control.frame = 0
      player.control.play()
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
  }
}
</script>

<style>
.v-content__wrap {
  background: #fff;
}
.player-zone__wrap {
  width: 100%;
  padding: 10px 0 0;
}
</style>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';
.game {
  height: 100%;
  overflow-x: hidden;

  &__game-not-found {
    width: 100%;
    text-align: center;
    color: $color-white;
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  &__game-image {
    margin: 0 5px;
    border: 2px solid $color-red-500;
    transform: scale(0.98);
    transition: 0.2s;

    &:hover {
      transform: scale(1.02);
    }
  }
  &__link {
    display: inline-block;
    color: $color-white;
    text-decoration: underline;
    margin-top: 10px;
    &:hover {
      text-decoration: none !important;
    }
  }
}
</style>
