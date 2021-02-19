<template>
  <div
    class="chip"
    @mouseover="handlerChipMouseOver"
    @mouseleave="hoverOnChip = false"
  >
    <div
      class="bots"
      @mouseover="handlerBotsMouseOver"
    >
      <div
        v-for="(bot, index) in game.bots"
        :key="index"
        :style="`background: center / cover no-repeat url(${getAvatar(bot.avatar, 600)})`"
        class="bot-avatar"
        @click="handlerClickUser(bot.username)"
      >
        <div class="gradient" />
        <div class="bot-name">
          {{ bot.displayName }}<span class="bot-version"> v {{ bot.v }}</span>
        </div>
        <div class="bot-icons">
          <img
            :src="getAntSkinImg(bot.skin)"
            :alt="$t('game.botSkin')"
            class="px-1"
            width="40px"
            height="40px"
          >
          <img
            :src="getCurrentLangImg(bot)"
            :alt="getCurrentLangName(bot)"
            width="40px"
          >
        </div>
        <div class="bot-info">
          <div>
            <span>{{ $t("game.size") }}:</span>
            <span class="info-value" >{{ bot.hive }}/{{ bot.ants }}</span>
          </div>
          <div>
            <span>{{ $t("game.score") }}:</span>
            <span class="info-value">
              {{ getNumberTruncated(bot.score) }}
            </span>
          </div>
          <div>
            <span>{{ $t("game.errors") }}:</span>
            <span class="info-value">
              {{ bot.err }}%
            </span>
          </div>
          <div>
            <span>{{ $t("game.rt") }}:</span>
            <span class="info-value">
              {{ getArtInMs(bot.art) }} ms
            </span>
          </div>
        </div>
        <v-img
          v-if="getVsImage(index)"
          :src="getVsImage(index)"
          width="45"
          class="vs-img"
        />
      </div>
      <v-img
        v-if="getFfaImage"
        :src="getFfaImage"
        width="80"
        class="ffa-img"
      />
    </div>
    <div class="game-info">
      <v-row class="pa-3">
        <v-col class="info-row" cols="12" sm="6">
          <AntHiveIcon class="mb-n1 mr-2" color="#d1cae8" icon="timer" />
          {{ game.age }}
        </v-col>
        <v-col class="info-row" cols="12" sm="6">
          <AntHiveIcon class="mb-n1 mr-2" color="#d1cae8" icon="billiards-rack" />
          {{ getGameScore }}
        </v-col>
      </v-row>
      <div class="author-info">
        <p>
          {{ $t("game.by") }} <span class="author-name">{{ getAuthorName }}</span>
        </p>
        <p>{{ getTimeAgo.time + $t(`games.${getTimeAgo.text}`) }}</p>
      </div>
      <div
        class="game-info-layout"
        @click="handlerGoToGame(game)"
      >
        <AntHiveIcon
          color="white"
          big
          class="mt-1 play-btn"
          icon="play-circle" />
      </div>
    </div>
  </div>
</template>

<script>
import langs from '../static/langs/data.json'
import Image from '@/mixins/image'
import { getImageById } from '@/services/Image'
import { timeAgo } from '@/services/User'
import Truncate from '@/mixins/truncate'
import AntHiveIcon from '@/components/AntHiveIcon'

export default {
  name: 'AntHiveGameVertical',
  components: {
    AntHiveIcon
  },
  mixins: [Image, Truncate],
  props: {
    game: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  data: () => ({
    hoverOnChip: false,
    hoverOnBots: false
  }),
  computed: {
    getTimeAgo() {
      return timeAgo(this.game.finished)
    },
    getFfaImage() {
      if (this.game.bots.length > 4) {
        return '/img/ffa.svg'
      }
    },
    getAuthorName() {
      return this.game.author
    },
    getGameScore() {
      return this.game.bots && this.game.bots.reduce((acc, bot) => (acc += bot.score), 0)
    }
  },
  methods: {
    getArtInMs(art) {
      return Math.round(art / 10) / 100
    },
    getImage(id) {
      return getImageById(`${id}-background.png`, 40)
    },
    getCurrentLangName(bot) {
      return langs.find(lang => lang.id === bot.lang).name
    },
    getCurrentLangImg(bot) {
      return langs.find(lang => lang.id === bot.lang).img
    },
    getVsImage(botIndex) {
      if (botIndex !== this.game.bots.length - 1 && this.game.bots.length > 1 && this.game.bots.length < 5) {
        return '/img/vs.svg'
      }
    },
    handlerChipMouseOver() {
      this.$gtag('event', 'gamechip_hover')
      this.hoverOnChip = true
    },
    handlerBotsMouseOver() {
      this.$gtag('event', 'gamechip_bots_hover')
    },
    handlerGoToGame(game) {
      this.$gtag('event', 'gamechip_to_game')
      this.$router.push({ path: this.localePath('game'), query: { id: game.id, v: game.v } })
    },
    handlerClickUser(username) {
      this.$gtag('event', 'gamechip_to_user')
      this.$router.push(this.localePath(`/users?username=${username}`))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';
$animation: ease 0.4s;
$bot-info-width: 150px;

.chip {
  width: 100%;
  max-width: 320px;
  height: 100%;
  margin: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: $box-shadow-default;
  background-color: $white;

  &:hover {
    .game-info-layout {
      opacity: 1;
      pointer-events: auto;
    }
  }
}

.author-name,
.time-ago {
  font-size: $font-small;
  color: $violet;
  margin: 0;
  line-height: $font-medium;
}

.game-info {
  padding: 8px;
  position: relative;
  .info-row {
    font-weight: $font-weight-bold;
    padding: 5px 12px;
  }
  .play-btn {
    pointer-events: none;
    margin: 0 auto;
  }
}

.game-info-layout {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: $animation;
  opacity: 0;
  pointer-events: none;
  cursor: pointer;
  background: $black-transparent;
}

.author-info {
  display: flex;
  justify-content: space-between;
  * {
    font-size: $font-small;
    color: $violet-light;
    margin: 0;
  }
  .author-name {
    font-weight: $font-weight-bold;
    color: $violet;
  }
}

.bot-info {
  position: absolute;
  width: $bot-info-width;
  height: 100%;
  padding: 20px;
  right: -$bot-info-width;
  opacity: 0;
  background-color: $lilac-select;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: right $animation;
  pointer-events: none;

  div {
    display: flex;
    justify-content: space-between;
    color: $violet-light;
  }

  .info-value {
    font-weight: $font-weight-bold;
  }
}

.bots {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  height: 185px;
  margin: -0.6px;

  &:hover {
    .ffa-img,
    .vs-img {
      opacity: 0;
    }

    .gradient {
      opacity: 1;
    }

    & .bot-avatar {
      min-width: 5%;
      flex: 0;
    }
  }
}
.bot-icons,
.bot-name {
  opacity: 0;
  pointer-events: none;
  transition: $animation;
}

.bot-name {
  position: absolute;
  width: calc(100% - #{$bot-info-width} - 10px);
  left: 10px;
  top: 5px;
  color: $white;
  font-size: $font-medium;
  font-weight: $font-weight-bold;
}

.bot-version {
  white-space: nowrap;
  font-weight: $font-weight-normal;
}

.bot-avatar {
  position: relative;
  cursor: pointer;
  flex: 1;
  min-width: 24%;
  margin: 0.6px;
  text-decoration: none !important;
  transition: $animation;
  &:hover {
    flex: 3 !important;
    width: 100% !important;

    .bot-icons,
    .bot-name {
      opacity: 1;
    }

    .bot-info {
      opacity: 1;
      right: 0;
    }
  }
}

.ffa-img,
.vs-img {
  transition: $animation;
  opacity: 1;
  position: absolute;
  pointer-events: none;
}

.vs-img {
  top: 50%;
  right: 0;
  transform: translate(50%, -50%);
  z-index: 1;
}

.ffa-img {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.bot-icons {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  * {
    background-color: $white;
    border-right: 2px solid $white;
    border-top: 2px solid $white;
  }
}

.button {
  max-width: 145px;
  width: 100%;
  margin: 0 auto;
}

.gradient {
  position: absolute;
  width: 100%;
  height: 100%;
  background: $user-background-gradient;
  pointer-events: none;
  opacity: 0;
  transition: $animation;
}
</style>
