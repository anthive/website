<template>
  <div
    class="chip"
    @mouseover="hoverOnChip = true"
    @mouseleave="hoverOnChip = false"
  >
    <div class="bots" >
      <nuxt-link
        :to="localePath(`/users/${bot.username}`)"
        v-for="(bot, index) in game.bots"
        :key="index"
        class="bot-avatar"
        :style="`background: center / cover no-repeat url(${getAvatar(bot.avatar, 600)})`"
      >
        <div class="gradient" />
        <div class="bot-name">
          {{ bot.displayName }}
        </div>
        <div class="bot-icons">
          <img
            class="bot-skin"
            width="40px"
            :src="getCurrentLangImg(bot)"
            :alt="getCurrentLangName(bot)" 
          />
          <img
            width="40px"
            :src="getCurrentLangImg(bot)"
            :alt="getCurrentLangName(bot)" 
          />
        </div>
        <div class="bot-info">
          <div>
            <AntHiveIcon class="mb-n1 mr-2" color="#9786bf" icon="summit" />
            100
          </div>
          <div>
            <AntHiveIcon class="mb-n1 mr-2" color="#9786bf" icon="trophy" />
            100
          </div>
          <div>
            <AntHiveIcon class="mb-n1 mr-2" color="#9786bf" icon="trophy-broken" />
            100
          </div>
          <div>
            <AntHiveIcon class="mb-n1 mr-2" color="#9786bf" icon="star" />
            100
          </div>
          <div>
            <AntHiveIcon class="mb-n1 mr-2" color="#9786bf" icon="timer" />
            100
          </div>
          <div>
            <AntHiveIcon class="mb-n1 mr-2" color="#9786bf" icon="alert" />
            100
          </div>
        </div>
        <div class="vs-text" v-if="getVsText(index)">{{ getVsText(index) }}</div>
      </nuxt-link>
      <!-- <nuxt-link
        :to="localePath(`/users/${bot.username}`)"
        v-for="(bot, index) in game.bots"
        :key="index + 100"
        class="bot-avatar"
        :style="`background: center / cover no-repeat url(${getAvatar(bot.avatar, 600)})`"
      >
        <div class="gradient" />
        <div class="bot-name">
          {{ bot.displayName }}
        </div>
        <div class="bot-icons">
          <img
            class="bot-skin"
            width="40px"
            :src="getCurrentLangImg(bot)"
            :alt="getCurrentLangName(bot)" 
          />
          <img
            width="40px"
            :src="getCurrentLangImg(bot)"
            :alt="getCurrentLangName(bot)" 
          />
        </div>
        <div class="bot-info">
          <div>
            <AntHiveIcon class="mb-n1 mr-2" color="#9786bf" icon="summit" />
            100
          </div>
          <div>
            <AntHiveIcon class="mb-n1 mr-2" color="#9786bf" icon="trophy" />
            100
          </div>
          <div>
            <AntHiveIcon class="mb-n1 mr-2" color="#9786bf" icon="trophy-broken" />
            100
          </div>
          <div>
            <AntHiveIcon class="mb-n1 mr-2" color="#9786bf" icon="star" />
            100
          </div>
          <div>
            <AntHiveIcon class="mb-n1 mr-2" color="#9786bf" icon="timer" />
            100
          </div>
          <div>
            <AntHiveIcon class="mb-n1 mr-2" color="#9786bf" icon="alert" />
            100
          </div>
        </div>
        <div class="vs-text" v-if="getVsText(index)">{{ getVsText(index) }}</div>
      </nuxt-link> -->
      <!-- <nuxt-link
        :to="localePath(`/users/${bot.username}`)"
        v-for="(bot, index) in game.bots"
        :key="index + 100"
        class="bot-avatar"
        :style="`background: center / cover no-repeat url(${getAvatar(bot.avatar, 600)})`"
      >
        <div class="gradient" />
        <div class="bot-name">
          {{ bot.displayName }}
        </div>
        <div class="bot-icons">
          <img
            class="bot-skin"
            width="40px"
            :src="getCurrentLangImg(bot)"
            :alt="getCurrentLangName(bot)" 
          />
          <img
            width="40px"
            :src="getCurrentLangImg(bot)"
            :alt="getCurrentLangName(bot)" 
          />
        </div>
        <div class="bot-info">
          <div>
            <AntHiveIcon class="mb-n1 mr-2" color="#9786bf" icon="summit" />
            100
          </div>
          <div>
            <AntHiveIcon class="mb-n1 mr-2" color="#9786bf" icon="trophy" />
            100
          </div>
          <div>
            <AntHiveIcon class="mb-n1 mr-2" color="#9786bf" icon="trophy-broken" />
            100
          </div>
          <div>
            <AntHiveIcon class="mb-n1 mr-2" color="#9786bf" icon="star" />
            100
          </div>
          <div>
            <AntHiveIcon class="mb-n1 mr-2" color="#9786bf" icon="timer" />
            100
          </div>
          <div>
            <AntHiveIcon class="mb-n1 mr-2" color="#9786bf" icon="alert" />
            100
          </div>
        </div>
        <div class="vs-text" v-if="getVsText(index)">{{ getVsText(index) }}</div>
      </nuxt-link> -->
      <!-- TODO: change to icon -->
      <div class="ffa-text" v-if="getFfaText">{{ getFfaText }}</div>
    </div>
    <div class="game-info">
      <v-row class="px-3">
        <v-col class="info-row" cols="12" sm="4">
          <AntHiveIcon class="mb-n1 mr-2" color="#d1cae8" icon="timer" />
          {{ game.age }}
        </v-col>
        <v-col class="info-row" cols="12" sm="4">
          <AntHiveIcon class="mb-n1 mr-2" color="#d1cae8" icon="star" />
          {{ game.age }}
        </v-col>
        <v-col class="info-row mt-n2" cols="12" sm="4">
          <AntHiveButton
            class="button"
            :outlined="!hoverOnChip"
            tile
            :color="hoverOnChip ? 'primary' : '#d1cae8'"
            :to="localePath({ name: 'game', query: { id: game.id, v: game.v }})"
          >
            <AntHiveIcon :color="hoverOnChip ? 'white' : '#d1cae8'" class="mt-1" icon="play-circle" />
          </AntHiveButton>
        </v-col>
      </v-row>
      <div class="author-info">
        <p>
          {{ $t("game.by") }} <span class="author-name">{{ getAuthorName }}</span>
        </p>
        <p>{{ getTimeAgo.time + $t(`games.${getTimeAgo.text}`) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Image from '@/mixins/image'
import { getImageById } from '@/services/Image'
import { timeAgo } from '@/services/User'
import langs from '../static/langs/data.json'
import AntHiveIcon from '@/components/AntHiveIcon'

export default {
  name: 'AntHiveGameVertical',
  components: {
    AntHiveIcon
  },
  mixins: [Image],
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
    getFfaText() {
      if (this.game.bots.length > 4) {
        return 'ffa' // TODO: use icon
      }
    },
    getAuthorName() {
      return this.game.author
    }
  },
  methods: {
    getImage(id) {
      return getImageById(`${id}-background.png`, 40)
    },
    getCurrentLangName(bot) {
      return langs.find(lang => lang.id === bot.lang).name
    },
    getCurrentLangImg(bot) {
      return langs.find(lang => lang.id === bot.lang).img
    },
    getVsText(botIndex) {
      if (botIndex !== this.game.bots.length - 1 && this.game.bots.length > 1 && this.game.bots.length < 5) {
        return 'vs' // TODO: use icon
      }
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
  min-height: 280px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: $box-shadow-default;
  background-color: $color-white;
}

.author-name,
.time-ago {
  font-size: $font-medium;
  color: $color-violet-700;
  margin: 0;
  line-height: $font-big;
}

.game-info {
  padding: 30px 8px 8px;
  .info-row {
    font-weight: $font-weight-bold;
    padding: 5px 12px;
  }
}

.author-info {
  display: flex;
  justify-content: space-between;
  * {
    font-size: $font-small;
    color: $color-violet-350;
    margin: 0;
  }
  .author-name {
    font-weight: $font-weight-bold;
    color: $color-violet-700;
  }
}

.bot-info {
  position: absolute;
  width: 110px;
  height: 100%;
  padding: 8px 20px;
  right: -110px;
  opacity: 0;
  background-color: $color-violet-150;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: right $animation;
  pointer-events: none;

  div {
    display: flex;
    justify-content: space-between;
    font-weight: $font-weight-bold;
    color: $color-violet-350;
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
    .ffa-text,
    .vs-text {
      opacity: 0;
    }

    & .bot-avatar {
      min-width: 5%;
      flex: 0;
    }
  }
}
.bot-skin,
.bot-name {
  opacity: 0;
  transition: $animation;
}

.bot-name {
  position: absolute;
  left: 10px;
  top: 5px;
  color: $color-white;
  font-size: $font-big;
  font-weight: $font-weight-bold;
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

    .bot-skin,
    .bot-name {
      opacity: 1;
    }

    .bot-info {
      opacity: 1;
      right: 0;
    }
  }
}

.ffa-text,
.vs-text {
  // TODO: change to icon
  transition: $animation;
  opacity: 1;
  font-size: 60px;
  font-weight: $font-weight-bolder;
  position: absolute;
  -webkit-text-fill-color: $color-black;
  -webkit-text-stroke-width: 4px;
  -webkit-text-stroke-color: $color-white;
  pointer-events: none;
}

.vs-text {
  top: 50%;
  right: 0;
  transform: translate(50%, -50%);
  z-index: 1;
}

.ffa-text {
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
    background-color: $color-white;
    border-right: 2px solid $color-white;
    border-top: 2px solid $color-white;
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
}
</style>
