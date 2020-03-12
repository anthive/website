<template lang="pug">
  section
    v-row.flex-nowrap.ma-8
      .players__wrap(v-show="gameLoaded") 
        .players__list-toggle(@click="togglePlayerList()")
           v-icon(class="players__list-toggle-icon mdi" color="white" size="40"  :class="[showPlayerList ? 'mdi-chevron-left'  : 'mdi-chevron-right']")
        .d-flex.flex-column.mr-5.players__list
          template(v-for="(player, index) in players")
            .d-flex
              userChip(
                :player="player"
                :number="index + 1"
                :isOpened="showPlayerList"
              )
      .player-zone__wrap(:class="{'collapsed': showPlayerList}")
        v-col.pa-0.player__section(cols="auto" style="overflow: auto; height:500px; widht: 50%" )
          .player__wrap(@click="playPause()" @mouseover="showActionsState = true" @mouseleave="showActionsState = false" ref="playerWrap")
          div(id="player")
            h2.px-2.white--text(class="loading") {{status}}
          v-slide-y-transition
            .end-game-layout(v-show="isGameEnd")
              .layout-buttons
                v-btn.layout-button.mb-6(color="#00BF70" dark width="320" height="72" block :href="`https://profile.anthive.io/new-game/?rematch=${this.gameId}`") Request rematch
                v-btn.layout-button(color="#333333" dark width="320" height="72" block @click="replay()") Replay
                  v-icon.ml-1(dark) autorenew
                .social-share
                  p Share the game
                  .d-flex.justify-center
                    v-tooltip(bottom)
                      template(v-slot:activator="{ on }")
                        v-btn.mx-3(fab dark color="#333333" v-on="on" target="_blank" :href="`https://www.linkedin.com/shareArticle?mini=true&url=${currentEncudeUrl}&title=Anthive.io game`")
                          v-icon mdi-linkedin
                      span Share on Linkedin
                    v-tooltip(bottom)
                      template(v-slot:activator="{ on }")
                        v-btn.mx-3(fab dark color="#333333" v-on="on" target="_blank" :href="`https://www.facebook.com/sharer/sharer.php?u=${currentEncudeUrl}`")
                          v-icon mdi-facebook
                      span Share on Facebook
                    v-tooltip(bottom)
                      template(v-slot:activator="{ on }")
                        v-btn.mx-3(fab dark color="#333333" v-on="on" target="_blank" :href="`http://twitter.com/share?url=/&text=Anthive.io Game - ${currentEncudeUrl}`")
                          v-icon mdi-twitter
                      span Share on Twitter
                    v-tooltip(bottom)
                      template(v-slot:activator="{ on }")
                        v-btn.mx-3(fab dark color="#333333" v-on="on" target="_blank" :href="`mailto:?subject=Anthive.io&body=Game - ${currentEncudeUrl}`")
                          v-icon mdi-email
                      span Send by Email
                    v-tooltip(bottom)
                      template(v-slot:activator="{ on }")
                        v-btn.mx-3(fab dark color="#333333" v-on="on" @click="copyToClipboard()") 
                          v-icon mdi-file-document-box-multiple
                      span Copy URL
        .log-panel__wrap(class="mt-3" v-show="gameLoaded")
          v-tabs(dark hide-slider) 
            v-tab(ripple='' dark)
              | Requests
            v-tab(ripple='' dark)
              | Response
            v-tab(ripple='' dark)
              | Logs
            v-tab-item
              v-card(flat='' dark)
                v-card-text
                  pre.log-panel__text Requests go here...
            v-tab-item
              v-card(flat='' dark)
                v-card-text 
                  pre.log-panel__text Response go here...
            v-tab-item
              v-card(flat='' dark)
                v-card-text
                  pre.log-panel__text Logs go here...
</template>

<script>
import userChip from '@/components/UserChip'
var player = null
export default {
  data: () => ({
    status: 'Loading...',
    theme: 1,
    players: [],
    isGameEnd: false,
    showPlayerList: false,
    gameLoaded: false
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
    },
    togglePlayerList() {
      this.showPlayerList = !this.showPlayerList
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
    },
    gameId() {
      return this.$route.query.id
    }
  }
}
</script>
<style>
.v-content__wrap {
  background: #080808;
}

.player-zone__wrap {
  width: 90%;
}

.player-zone__wrap.collapsed {
  width: 60%;
}

#player {
  background-repeat: repeat;
  background-color: #388e3c;
}

.players__wrap {
  position: relative;
}

.players__list {
  height: 987px;
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
  background-color: #1a1a1a;
}

.players__list-toggle {
  position: absolute;
  width: 40px;
  height: 60px;
  right: -20px;
  z-index: 1;
  background: rgba(25, 25, 25, 0.8);
  border-radius: 0px 8px 8px 0px;
  cursor: pointer;
}

.players__list-toggle-icon {
  font-size: 40px;
  margin: 10px;
  margin-left: 0px;
  color: white;
}

.players__list::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #1a1a1a;
}

.players__list::-webkit-scrollbar {
  width: 5px;
  background-color: #f5f5f5;
}

.players__list::-webkit-scrollbar-thumb {
  background-color: #403f3f;
  border: none;
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

.log-panel__wrap {
  height: 476px;
  background-color: #262626;
}

.log-panel__wrap > .v-tabs {
  height: 100%;
}

.log-panel__wrap .v-tabs-items {
  height: 90%;
  background-color: #191919;
  overflow: auto;
}
.log-panel__wrap .v-card__text {
  background-color: #191919;
}

.log-panel__wrap .v-slide-group__wrapper {
  background: #343434;
  align-items: center;
}

.log-panel__wrap .v-tab {
  border: 2px solid #474747;
  margin: 0 10px;
  text-transform: none;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #595959 !important;
}

.log-panel__wrap .v-tab--active {
  background: #595959;
  border: 1px solid #404040;
  color: #ffffff !important;
}

.log-panel__wrap .v-slide-group__content {
  height: 35px;
  margin: 0 10px;
}

.log-panel__text {
  font-family: Consolas;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
}
</style>
