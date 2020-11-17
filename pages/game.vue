<template>
  <section class="game page-wrap">
    <v-container>
      <template v-if="isGameAvailable">
        <v-row  class="mx-auto">
          <v-col cols="12" md="7" class="player-zone__wrap">
            <GamePlayer :isGameEnd="isGameEnd"  @replay="replay" />
          </v-col>
          <v-col cols="12" md="5" class="game__text-section">
            <div>
              <h1>{{ $t("game.game") }}</h1>
              <h4 class="my-5">{{ $t("game.players") }}</h4>
              <v-avatar class="mx-1" v-for="(player, index) in players" :key="index">
                <v-img width="40" :src="getAvatar(player.avatar)" />
              </v-avatar>
              <div class="mt-10">
                <AntHiveBtn large tile class="mr-4" color="action" :to="localePath('sandbox')">{{
                  $t("header.sandbox")
                }}</AntHiveBtn>
                <AntHiveBtn large tile color="accent" @click="handlerClickGetStarted">{{
                  $t("header.buttonJoin")
                }}</AntHiveBtn>
            </div>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <div class="mt-12 mx-auto">
            <GamePlayerList :players="players" />
          </div>
        </v-row>
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
import { getGame } from '@/services/Game'
import GameLogPanel from '@/components/GameLogPanel'
import GamePlayerList from '@/components/GamePlayerList'
import GamePlayer from '@/components/GamePlayer'
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
    GamePlayer
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
          //this.players = player.framer.playerList.sort(this.compare)
          this.players = await this.getPlayers()
          this.gameLoaded = true
        })
        // eslint-disable-next-line
        player.on(AnthivePlayer.event.END, () => {
          this.isGameEnd = true
        })
      } else {
        this.isGameAvailable = false
        this.$ga.event({ eventCategory: 'game', eventAction: 'notfound', eventValue: this.gameId })
      }
    })
  },
  methods: {
    handlerClickGetStarted() {
      this.$ga.event({ eventCategory: 'getstarted', eventAction: 'redirect', eventLabel: 'gamepage' })
      window.location.href = this.profileURL
    },
    getAvatar(id) {
      return `${process.env.API_URL}images/${id}/100/100`
    },
    getPlayers() {
      return getGame(this.gameId).then(game => game.bots)
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
}
</style>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';
.game {
  height: 100%;
  overflow-x: hidden;

  &__text-section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

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
