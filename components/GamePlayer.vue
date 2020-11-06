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
      <h2 class="px-2 white--text loading">{{ $t('game.loading') }}</h2>      
    </div>
    <div class="inset-shadow" />
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
            :href="getRematchURL"
            >{{ $t('game.requestRematch') }}</v-btn
          >
          <v-btn
            class="layout-button"
            color="#333333"
            dark
            width="320"
            height="72"
            block
            @click="$emit('replay')"
            >{{ $t('game.replay') }}
            <AntHiveIcon class="ml-1" color="white">autorenew</AntHiveIcon>
          </v-btn>
          <div class="social-share">
            <p>{{ $t('game.shareGame') }}</p>
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
                    rel="noreferrer"
                    :href="`https://www.linkedin.com/shareArticle?mini=true&url=${currentEncudeUrl}&title=Anthive.io game`"
                  >
                    <AntHiveIcon color="grey">linkedin</AntHiveIcon>
                  </v-btn> </template
                ><span>{{ $t('game.shareOn') }} Linkedin</span>
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
                    rel="noreferrer"
                    :href="`https://www.facebook.com/sharer/sharer.php?u=${currentEncudeUrl}`"
                  >
                    <AntHiveIcon color="grey">facebook</AntHiveIcon>
                  </v-btn> </template
                ><span>{{ $t('game.shareOn') }} Facebook</span>
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
                    rel="noreferrer"
                    :href="`https://twitter.com/share?url=/&text=Anthive.io Game - ${currentEncudeUrl}`"
                  >
                    <AntHiveIcon color="grey">twitter</AntHiveIcon>
                  </v-btn> </template
                ><span>{{ $t('game.shareOn') }} Twitter</span>
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
                    rel="noreferrer"
                    :href="`mailto:?subject=Anthive.io&body=Game - ${currentEncudeUrl}`"
                  >
                    <AntHiveIcon color="grey">email</AntHiveIcon>
                  </v-btn> </template
                ><span>{{ $t('game.sendBy') }} Email</span>
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
                    <AntHiveIcon color="grey">file-document-box-multiple</AntHiveIcon>
                  </v-btn> </template
                ><span>{{ $t('game.copyUrl') }}</span>
              </v-tooltip>
            </div>
          </div>
        </div>
      </div>
    </v-slide-y-transition>
  </v-col>
</template>


<script>
import AntHiveIcon from '@/components/AntHiveIcon'

export default {
  name: 'GamePlayer',
  components: {
    AntHiveIcon
  },
  props: {
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
    },
    getRematchURL() {
      return `${process.env.PROFILE_URL}new-game/?rematch=${this.gameId}`
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

<style lang="scss" scoped>
@import '@/assets/style/global.scss';

#player {
  background-repeat: repeat;
  position: relative;
}
.game__vs-separator {
  position: relative;
  top: -80px;
}
.player__section {
  position: relative;
}
.inset-shadow {
  position: absolute;
  box-shadow: inset 0px 0px 100px 5px $color-violet-600;
  pointer-events: none;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
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
