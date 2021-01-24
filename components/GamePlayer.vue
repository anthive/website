<template>
  <v-col class="pa-0 player__section" cols="auto">
    <div id="player">
      <v-skeleton-loader tile type="image, image, list-item" />
    </div>
    <v-slide-y-transition>
      <div v-show="isGameEnd" class="end-game-layout">
        <div class="layout-buttons">
          <v-btn
            :href="getRematchUrl"
            class="layout-button mb-6"
            color="#00BF70"
            dark
            block
          >{{ $t("game.requestRematch") }}</v-btn
          >
          <v-btn
            class="layout-button"
            color="#333333"
            dark
            block
            @click="$emit('replay')"
          >{{ $t("game.replay") }}
            <AntHiveIcon icon="autorenew" class="ml-1" color="white" />
          </v-btn>
          <div class="social-share">
            <p>{{ $t("game.shareGame") }}</p>
            <div class="d-flex justify-center">
              <v-tooltip bottom color="accent" content-class="b-radius-0">
                <template v-slot:activator="{ on }">
                  <v-btn
                    :href="`https://www.linkedin.com/shareArticle?mini=true&url=${currentEncudeUrl}&title=Anthive.io game`"
                    class="share-button"
                    fab
                    dark
                    color="#333333"
                    target="_blank"
                    rel="noreferrer"
                    v-on="on"
                  >
                    <AntHiveIcon icon="linkedin" color="grey" />
                  </v-btn>
                </template>
                <span>{{ $t("game.shareOn") }} Linkedin</span>
              </v-tooltip>
              <v-tooltip bottom color="accent" content-class="b-radius-0">
                <template v-slot:activator="{ on }">
                  <v-btn
                    :href="`https://www.facebook.com/sharer/sharer.php?u=${currentEncudeUrl}`"
                    class="share-button"
                    fab
                    dark
                    color="#333333"
                    target="_blank"
                    rel="noreferrer"
                    v-on="on"
                  >
                    <AntHiveIcon icon="facebook" color="grey" />
                  </v-btn>
                </template>
                <span>{{ $t("game.shareOn") }} Facebook</span>
              </v-tooltip>
              <v-tooltip bottom color="accent" content-class="b-radius-0">
                <template v-slot:activator="{ on }">
                  <v-btn
                    :href="`https://twitter.com/share?url=/&text=Anthive.io Game - ${currentEncudeUrl}`"
                    class="share-button"
                    fab
                    dark
                    color="#333333"
                    target="_blank"
                    rel="noreferrer"
                    v-on="on"
                  >
                    <AntHiveIcon icon="twitter" color="grey" />
                  </v-btn>
                </template>
                <span>{{ $t("game.shareOn") }} Twitter</span>
              </v-tooltip>
              <v-tooltip bottom color="accent" content-class="b-radius-0">
                <template v-slot:activator="{ on }">
                  <v-btn
                    :href="`mailto:?subject=Anthive.io&body=Game - ${currentEncudeUrl}`"
                    class="share-button"
                    fab
                    dark
                    color="#333333"
                    target="_blank"
                    rel="noreferrer"
                    v-on="on"
                  >
                    <AntHiveIcon icon="email" color="grey" />
                  </v-btn>
                </template>
                <span>{{ $t("game.sendBy") }} Email</span>
              </v-tooltip>
              <v-tooltip bottom color="accent" content-class="b-radius-0">
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="share-button"
                    fab
                    dark
                    color="#333333"
                    v-on="on"
                    @click="copyToClipboard()"
                  >
                    <AntHiveIcon icon="file-document-box-multiple" color="grey"/>
                  </v-btn>
                </template>
                <span>{{ $t("game.copyUrl") }}</span>
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
    isGameEnd: {
      type: Boolean,
      required: true,
      default: false
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
    },
    getRematchUrl() {
      return `${process.env.PROFILE_URL}/new-game/?rematch=${this.gameId}`
    }
  },
  methods: {
    async copyToClipboard() {
      try {
        await this.$copyText(this.currentUrl)
      } catch (er) {
        throw new Error(er)
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
  margin-bottom: -3px;
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
  padding: 10px;
  width: 60%;
  height: 80%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: $white;
  flex-direction: column;
  justify-content: center;
  display: flex;
}
.layout-button {
  max-height: 72px !important;
  text-transform: none;
  font-weight: 600;
  font-size: 24px !important;
  letter-spacing: 1px;
}
.social-share {
  margin-top: 10%;
  text-align: center;
  font-size: $font-medium;
}

.share-button {
  margin: 0 12px;
}

@media screen and (max-width: $screen-lg) {
  .layout-button {
    max-height: 46px !important;
    font-size: 14px !important;
    letter-spacing: 1px;
  }
  .social-share {
    margin-top: 15px;
    font-size: $font-small;
    p {
      margin-bottom: 5px;
    }
  }
  .share-button {
    height: 35px;
    width: 35px;
  }
}
</style>
