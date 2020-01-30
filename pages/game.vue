<template lang="pug">
  section
    v-row.flex-column.align-center.ma-8()
      v-col.players.text-center(cols="12" md="8")
        template(v-for="(player, index) in players")
          userInfoFull(
            :player="player"
          )
          span.game__vs-separator.mx-4(v-if="index+1<players.length") VS
      v-col.pa-0.player__section(cols="auto" style="overflow: auto;")
        .player__actions( @mouseover="showActionsState = true" @mouseleave="showActionsState = false" ref="playerActions" v-show="showActionsState")
          v-progress-linear.my-0(height="5" color="warning" :value="percentTick")
          v-toolbar.transparent(v-if="players.length>0" flat)
            v-toolbar-items
              v-btn(@click="navigate('prev')" title="Previous" icon)
                v-icon.white--text skip_previous
              v-btn(@click="playPause()" :title="isPlaying ? 'pause':'play'" icon)
                v-icon.white--text {{ isPlaying ? 'pause':'play_arrow' }}
              v-btn(@click="navigate('next')" title="Next" icon)
                v-icon.white--text skip_next
            v-toolbar-title.body-2.white--text {{ currentTick }} / {{ totalTicks }}
            v-spacer
            v-toolbar-title.body-2
              v-icon.white--text fast_forward
            v-toolbar-items
              v-btn.white--text(@click="setSpeed(1)" title="Speed 1x" :disabled="currentSpeed == 1" icon) 1x
              v-btn.white--text(@click="setSpeed(2)" title="Speed 2x" :disabled="currentSpeed == 2" icon) 2x
              v-btn.white--text(active-class="btn-disabled" @click="setSpeed(4)" title="Speed 4x" :disabled="currentSpeed == 4" icon) 4x
        .player__wrap(@click="playPause()" @mouseover="showActionsState = true" @mouseleave="showActionsState = false" ref="playerWrap")
        div(id="player")
          h2.px-2.white--text(class="loading") {{status}}
</template>

<script>
import userInfoFull from "@/components/UserInfoFull";
var player = null;
export default {
  data: () => ({
    status: "Loading...",
    theme: 1,
    players: [],
    totalTicks: 0,
    currentTick: 0,
    percentTick: 0,
    currentSpeed: 4,
    isPlaying: true,
    showActionsState: false
  }),
  components: {
    userInfoFull
  },
  mounted() {
    const base = "https://storage.googleapis.com/anthive-prod-games/";
    const gameid = this.$route.query.id || "";
    const version = this.$route.query.v || "";
    const dataUrl = base + version + "/" + gameid + ".zip";
    if (dataUrl != null){
      console.log(dataUrl)
      player = new AnthivePlayer("#player", dataUrl);
      player.on(AnthivePlayer.event.READY, () => {
        this.players = player.framer.playerList;
      });
    } else {
      this.status = "Can't find game."
    }
  },
  methods: {
    showActions() {
      this.showActionsState = !this.showActionsState
    },
    navigate(dir) {
      this.isPlaying = false;
      if(dir == "prev") {
        player.prev()
      } else {
        player.next()
      }
    },
    playPause() {
      if (this.isPlaying){
        player.pause()
        this.isPlaying = false;
        this.$refs.playerWrap.style.backgroundColor = 'rgba(0, 0, 0, .3)'
      }else {
        player.play()
        this.isPlaying = true;
        this.$refs.playerWrap.style.backgroundColor = 'transparent'
      }
    },
    setSpeed(value) {
      this.currentSpeed = value
      player.speed = value
    },
  }
}
</script>
<style>
#player {
  background-repeat: repeat;
  background-color: #388e3c;
}
.game__vs-separator {
  position: relative;
  top: -80px;
}
.player__section {
  position: relative;
}
.player__actions {
  position: absolute;
  bottom: 0;
  width: 100%;
  min-width: 480px;
  background: rgba(0, 0, 0, .3);
  z-index: 10;
}
.v-btn--disabled {
  background: rgba(255, 255, 255, .2);
}
.v-btn--disabled > .v-btn__content {
  color: rgba(255, 255, 255, .8);
}
.player__wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>