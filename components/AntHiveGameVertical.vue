<template>
  <div
    class="chip"
    @mouseover="handlerChipMouseOver"
    @mouseleave="hoverOnChip = false"
    @click="$vuetify.breakpoint.xsOnly ? handlerGoToGame(game) : false"
  >
    <div
      class="bots"
      @mouseover="handlerBotsMouseOver"
    >
      <div
        v-for="(bot, index) in game.bots"
        :key="index"
        :style="`background: center / cover no-repeat url(${getBotAvatar(bot, 600)})`"
        class="bot-avatar"
        @click="handlerClickUser(bot)"
      >
        <div class="gradient" />
        <div v-if="bot" class="bot-name">
          {{ bot.displayName }}<span class="bot-version"> v {{ bot.v }}</span>
        </div>
        <div class="bot-icons">
          <img
            v-if="bot"
            :src="getCurrentLangImg(bot)"
            :alt="getCurrentLangName(bot)"
            width="40px"
          >
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
        <p>
          <span v-if="getTimeAgo.time">
            {{ getTimeAgo.time }}
          </span>
          {{ $t(`games.${getTimeAgo.text}`) }}
        </p>
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
import langs from '../static/data/langs.json'
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
  data() {
    return {
      hoverOnChip: false,
      hoverOnBots: false,
      NA: 'N/A'
    }
  },
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
      return this.game.bots && this.game.bots.reduce((acc, bot) => (acc + bot ? bot.score : 0), 0)
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
      const currentLang = langs.find(lang => lang.id === bot.lang)
      return currentLang ? currentLang.name : null
    },
    getCurrentLangImg(bot) {
      const currentLang = langs.find(lang => lang.id === bot.lang)
      return currentLang ? currentLang.img : null
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
    handlerClickUser(bot) {
      this.$gtag('event', 'gamechip_to_user')
      if (!bot) { return }
      this.$router.push(this.localePath(`/users?username=${bot.username}`))
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';
$animation: ease 0.4s;

.chip {
  width: 100%;
  max-width: 320px;
  height: 100%;
  margin: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: $box-shadow-default;
  background-color: $white;

  @media screen and (max-width: $screen-md) {
    max-width: 260px;
  }
  @media screen and (max-width: $screen-sm) {
    max-width: 100%;
  }
  &:hover {
    @media screen and (min-width: $screen-sm) {
      .game-info-layout {
        opacity: 1;
        pointer-events: auto;
      }
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

.bots {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  height: 185px;
  margin: -0.6px;

  &:hover {
    @media screen and (min-width: $screen-sm) {
      .gradient {
        opacity: 1;
      }
    }
  }
}
.bot-icons,
.bot-name {
  opacity: 1;
  pointer-events: none;
  transition: $animation;
}

.bot-name {
  position: absolute;
  left: 10px;
  top: 5px;
  color: $white;
  font-size: $font-small;
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
    @media screen and (min-width: $screen-sm) {

      .bot-icons,
      .bot-name {
        opacity: 1;
      }
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
  opacity: 0.7;
  transition: $animation;
}
</style>
