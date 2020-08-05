<template>
  <section class="game texture-arrows">
    <v-row class="texture-scrabble flex-nowrap mx-auto">
        
      <GamePlayerList
        v-show="gameLoaded"
        v-bind:players="players"
        @togglePlayerList="showPlayerList = !showPlayerList"
      />
      <div class="player-zone__wrap" :class="{ collapsed: showPlayerList }">
        <GamePlayer :status="status" :isGameEnd="isGameEnd"  @replay="replay()" />
      </div>
    </v-row>
  </section>
</template>


<script>
import GameLogPanel from '@/components/GameLogPanel'
import GamePlayerList from '@/components/GamePlayerList'
import GamePlayer from '@/components/GamePlayer'
var player = null
export default {
  data: () => ({
    status: 'loading',
    theme: 1,
    players: [],
    isGameEnd: false,
    gameLoaded: false,
    showPlayerList: false
  }),
  components: {
    GameLogPanel,
    GamePlayerList,
    GamePlayer
  },
  mounted() {
    const base = 'https://storage.googleapis.com/anthive-prod-games/'
    const gameid = this.$route.query.id || ''
    const version = this.$route.query.v || ''
    const dataUrl = base + version + '/' + gameid + '.zip'
    if (dataUrl != null) {
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
      this.status = "Can't find game."
    }
  },
  methods: {
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
.game {
  height: 100%;
  overflow-x: hidden;
}
</style>
