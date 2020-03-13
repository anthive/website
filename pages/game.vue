<template lang="pug">
  section
    v-row.flex-nowrap.ma-8
      PlayersList(v-show="gameLoaded" v-bind:players="players" @togglePlayerList="showPlayerList = !showPlayerList") 
      .player-zone__wrap(:class="{'collapsed': showPlayerList}")
        GamePlayer(:status="status" :isGameEnd="isGameEnd" )
        GameLogPanel(v-show="gameLoaded")
</template>

<script>
import GameLogPanel from '@/components/gamePage/GameLogPanel'
import PlayersList from '@/components/gamePage/PlayersList'
import GamePlayer from '@/components/gamePage/GamePlayer'
var player = null
export default {
  data: () => ({
    status: 'Loading...',
    theme: 1,
    players: [],
    isGameEnd: false,
    gameLoaded: false,
    showPlayerList: false
  }),
  components: {
    GameLogPanel,
    PlayersList,
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
</style>
