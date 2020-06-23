<template>
  <v-col
    class="pa-0 player__section"
    cols="auto"
  >
    <div
      class="player__wrap"
      @click="playPause()"
      @mouseover="showActionsState = true"
      @mouseleave="showActionsState = false"
      ref="playerWrap"
    ></div>
    <div id="player">
      <h2 class="px-2 white--text loading">{{ status }}</h2>
    </div>
    <v-slide-y-transition>
      <div class="end-game-layout" v-show="isGameEnd">
        <div class="layout-buttons">
          <v-btn
            class="layout-button mb-6"
            color="#00BF70"
            dark
            width="320"
            height="72"
            block
            :href="`https://profile.anthive.io/new-game/?rematch=${this.gameId}`"
            >Request rematch</v-btn
          >
          <v-btn
            class="layout-button"
            color="#333333"
            dark
            width="320"
            height="72"
            block
            @click="replay()"
            >Replay
            <v-icon class="ml-1" dark>autorenew</v-icon>
          </v-btn>
          <div class="social-share">
            <p>Share the game</p>
            <div class="d-flex justify-center">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="mx-3"
                    fab
                    dark
                    color="#333333"
                    v-on="on"
                    target="_blank"
                    :href="`https://www.linkedin.com/shareArticle?mini=true&url=${currentEncudeUrl}&title=Anthive.io game`"
                  >
                    <v-icon>mdi-linkedin</v-icon>
                  </v-btn> </template
                ><span>Share on Linkedin</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="mx-3"
                    fab
                    dark
                    color="#333333"
                    v-on="on"
                    target="_blank"
                    :href="`https://www.facebook.com/sharer/sharer.php?u=${currentEncudeUrl}`"
                  >
                    <v-icon>mdi-facebook</v-icon>
                  </v-btn> </template
                ><span>Share on Facebook</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="mx-3"
                    fab
                    dark
                    color="#333333"
                    v-on="on"
                    target="_blank"
                    :href="`http://twitter.com/share?url=/&text=Anthive.io Game - ${currentEncudeUrl}`"
                  >
                    <v-icon>mdi-twitter</v-icon>
                  </v-btn> </template
                ><span>Share on Twitter</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="mx-3"
                    fab
                    dark
                    color="#333333"
                    v-on="on"
                    target="_blank"
                    :href="`mailto:?subject=Anthive.io&body=Game - ${currentEncudeUrl}`"
                  >
                    <v-icon>mdi-email</v-icon>
                  </v-btn> </template
                ><span>Send by Email</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="mx-3"
                    fab
                    dark
                    color="#333333"
                    v-on="on"
                    @click="copyToClipboard()"
                  >
                    <v-icon>mdi-file-document-box-multiple</v-icon>
                  </v-btn> </template
                ><span>Copy URL</span>
              </v-tooltip>
            </div>
          </div>
        </div>
      </div>
    </v-slide-y-transition>
  </v-col>
</template>


<script>
export default {
  name: 'GamePlayer',
  props: {
    status: String,
    isGameEnd: Boolean
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
  },
  methods: {
    async copyToClipboard() {
      try {
        await this.$copyText(this.currentUrl)
      } catch (er) {
        console.error(er)
      }
    }
  }
}
</script>

<style scoped>
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
