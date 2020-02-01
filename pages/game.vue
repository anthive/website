<template lang="pug">
  section
    v-row.flex-nowrap.ma-8()
      .d-flex.flex-column.mr-5.mt-n2
        template(v-for="(player, index) in players")
          .d-flex
            span.d-flex.flex-column.justify-center.headline.mr-4.font-weight-bold {{ index + 1 }}
            userChip.my-2(
              :player="player"
            )
      v-col.pa-0.player__section(cols="auto" style="overflow: auto;")
        .player__wrap(@click="playPause()" @mouseover="showActionsState = true" @mouseleave="showActionsState = false" ref="playerWrap")
        div(id="player")
          h2.px-2.white--text(class="loading") {{status}}
        .end-game-layout(v-if="isGameEnd")
          .layout-buttons
            v-btn.layout-button.mb-6(color="#00BF70" dark width="320" height="72" block) Request rematch
            v-btn.layout-button(color="#333333" dark width="320" height="72" block @click="replay()") Replay
              v-icon.ml-1(dark) autorenew
            .social-share
              p Share the game
              .d-flex.justify-center
                v-btn.mx-3(fab dark color="#333333" target="_blank" :href="`https://www.linkedin.com/shareArticle?mini=true&url=${currentEncudeUrl}&title=Anthive.io game`")
                  v-icon mdi-linkedin
                v-btn.mx-3(fab dark color="#333333" target="_blank" :href="`https://www.facebook.com/sharer/sharer.php?u=${currentEncudeUrl}`")
                  v-icon mdi-facebook
                v-btn.mx-3(fab dark color="#333333" target="_blank" :href="`http://twitter.com/share?url=/&text=Anthive.io Game - ${currentEncudeUrl}`")
                  v-icon mdi-twitter
                v-btn.mx-3(fab dark color="#333333" target="_blank" :href="`mailto:?subject=Anthive.io&body=Game - ${currentEncudeUrl}`")
                  v-icon mdi-email
                v-tooltip(top)
                  template(v-slot:activator="{ on }")
                    v-btn.mx-3(fab dark color="#333333" v-on="on" @click="copyToClipboard()") 
                      v-icon mdi-file-document-box-multiple
                  span Copy URL
</template>

<script>
import userChip from '@/components/UserChip'
var player = null
export default {
  data: () => ({
    status: 'Loading...',
    theme: 1,
    players: [],
    isGameEnd: false
  }),
  components: {
    userChip
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
      // add play game event from anthive-player
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
    async copyToClipboard() {
      try {
        await this.$copyText(this.currentUrl)
      } catch (er) {
        console.error(er)
      }
    }
  },
  computed: {
    currentUrl() {
      return `https://anthive.io${this.$route.fullPath}`
    },
    currentEncudeUrl() {
      return encodeURIComponent(this.currentUrl)
    }
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
.v-btn--disabled {
  background: rgba(255, 255, 255, 0.2);
}
.v-btn--disabled > .v-btn__content {
  color: rgba(255, 255, 255, 0.8);
}
.player__wrap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.end-game-layout {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.88);
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.layout-buttons {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.layout-button {
  text-transform: none;
  font-weight: 600;
  font-size: 24px !important;
  letter-spacing: 1px;
}
.social-share {
  margin-top: 80px;
  color: white;
  text-align: center;
  font-size: 16px;
}
</style>
