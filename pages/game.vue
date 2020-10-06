<template>
  <section class="game texture-arrows">

    <v-row v-if="isGameAvailable" class="texture-scrabble flex-nowrap mx-auto">
      <GamePlayerList
        v-show="gameLoaded"
        v-bind:players="players"
        @togglePlayerList="showPlayerList = !showPlayerList"
      />
      <div class="player-zone__wrap" :class="{ collapsed: showPlayerList }">
        <GamePlayer :isGameEnd="isGameEnd"  @replay="replay" />
      </div>
    </v-row>

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
  </section>
</template>


<script>
import GameLogPanel from '@/components/GameLogPanel'
import GamePlayerList from '@/components/GamePlayerList'
import GamePlayer from '@/components/GamePlayer'
var player = null
export default {
  data: () => ({
    isGameAvailable: true,
    theme: 1,
    players: [],
    isGameEnd: false,
    gameLoaded: false,
    showPlayerList: false,
    gameId: ''
  }),
  components: {
    GameLogPanel,
    GamePlayerList,
    GamePlayer
  },
  mounted() {
    const base = 'https://storage.googleapis.com/anthive-prod-games/'
    this.gameId = this.$route.query.id || ''
    const version = this.$route.query.v || ''
    const dataUrl = base + version + '/' + this.gameId + '.zip'
    if (this.isGameFound(dataUrl)) {
      // eslint-disable-next-line
      player = new AnthivePlayer('#player', dataUrl)
      // eslint-disable-next-line
      player.on(AnthivePlayer.event.READY, () => {
        this.players = player.framer.playerList.sort(this.compare)
        this.gameLoaded = true
      })
      // eslint-disable-next-line
      player.on(AnthivePlayer.event.END, () => {
        this.isGameEnd = true
      })
    } else {
      this.isGameAvailable = false
      this.$ga.event({ eventCategory: 'game', eventAction: 'notfound' })
    }
  },
  methods: {
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
  padding-left: 50px;
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
    border-radius: 2px;
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
