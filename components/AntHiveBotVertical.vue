<template>
  <div
    class="chip"
    @mouseover="$gtag('event', 'vbot_hover')"
    @click="$vuetify.breakpoint.xsOnly ? challange(bot.id) : false">
    <div :style="`background: center / cover no-repeat url(${getBotAvatar(bot, 400)})`" class="img">
      <img
        :src="getCurrentLangImg"
        :alt="getCurrentLang.name"
        class="lang-icon"
        width="40px"
      >
    </div>
    <div class="description">
      <p class="bot-title">{{ getBotName }}<span class="version">v {{ bot.v }}</span></p>
      <div class="stats">
        <div class="stats-row">
          <p>{{ $t("userInfo.games") }}:</p>
          <p class="value">{{ bot.games }}</p>
        </div>
        <div class="stats-row">
          <p>{{ $t("userInfo.wl") }}:</p>
          <p class="value">{{ bot.wins }}/{{ bot.losses }}</p>
        </div>
        <div class="stats-row">
          <p>{{ $t("userInfo.mmr") }}:</p>
          <p class="value">{{ bot.mmr }}</p>
        </div>
        <div class="stats-row">
          <p>{{ $t("global.art") }}:</p>
          <p class="value">{{ bot.art }}</p>
        </div>
        <div class="stats-row">
          <p>{{ $t("userInfo.errors") }}:</p>
          <p class="value">{{ bot.err }}%</p>
        </div>
      </div>
      <div v-if="!isUserProfile" class="layout">
        <nuxt-link
          :to="localePath(`/users?username=${getUsername}`)"
          class="user-info"
          @click.native="$gtag('event', 'vbot_to_author')">
          {{ $t("game.by") }} {{ getUsername }}
          <v-avatar class="ml-1" tile size="35">
            <v-img :src="getUserAvatar(user, 70)" />
          </v-avatar>
        </nuxt-link>
        <AntHiveButton
          class="button"
          tile
          color="primary"
          @click="challange(bot.id)"
        >
          <AntHiveIcon
            icon="challange"
            class="mx-1"
            small
            color="white" />
          <span>{{ $t("userInfo.challangeMe") }}</span>
        </AntHiveButton>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import langs from '../static/langs/data.json'
import Image from '@/mixins/image'
import Truncate from '@/mixins/truncate'
import AntHiveIcon from '@/components/AntHiveIcon'

export default {
  name: 'AntHiveBotVertical',
  components: {
    AntHiveIcon
  },
  mixins: [Image, Truncate],
  props: {
    bot: {
      type: Object,
      required: true
    },
    user: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  computed: {
    ...mapGetters(['getUser']),
    getCurrentLang() {
      return langs.find(lang => lang.id === this.bot.lang)
    },
    getCurrentLangImg() {
      return this.getCurrentLang && this.getCurrentLang.img
    },
    getBotName() {
      if (this.bot && this.bot.displayName) {
        return this.getStringTruncated(this.bot.displayName, 10)
      }
    },
    getUsername() {
      if (this.user && this.user.username) {
        return this.user.username
      }
      return 'N/A'
    },
    isUserProfile() {
      if (!this.getUser) { return false }
      return this.getUsername === this.getUser.userName
    }
  },
  methods: {
    challange(botId) {
      this.$gtag('event', 'vbot_challange')
      const challangeUrl = `${process.env.PROFILE_URL}/new-game?challange=${botId}`
      window.open(challangeUrl)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';

.chip {
  width: 100%;
  max-width: 200px;
  height: 100%;
  max-height: 310px;
  margin: 20px;
  display: flex;
  flex-direction: column;
  box-shadow: $box-shadow-default;
  background-color: $white;

  .img {
    background-position: center;
    width: 100%;
    min-height: 120px;
  }

  .bot-title {
    font-weight: $font-weight-bold;
    margin-bottom: 10px;
  }

  .version {
    margin-left: 10px;
    font-weight: $font-weight-normal;
    color: $violet-light;
  }

  .lang-icon {
    background-color: $white;
    border-right: 2px solid $white;
    border-bottom: 2px solid $white;
  }

  .description {
    padding: 12px 18px;
    height: 100%;
    position: relative;

    .layout {
      position: absolute;
      flex-direction: column;
      justify-content: flex-end;
      display: flex;
      padding: 15px;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      transition: all 0.4s;
      background: $black-transparent;
      opacity: 0;
      pointer-events: none;
    }

    .user-info {
      cursor: pointer;
      font-size: $font-small;
      color: $white;
      margin: 0 auto 30px;
    }
  }

  &:hover {
    @media screen and (min-width: $screen-sm) {
      .layout {
        pointer-events: auto;
        opacity: 1;
      }
    }
  }

  .stats {
    .stats-row {
      display: flex;
      justify-content: space-between;
    }

    p {
      margin-bottom: 4px;
      font-size: $font-small;
    }

    .value {
      font-weight: $font-weight-bold;
    }
  }

  .button {
    letter-spacing: 0;
  }
}
</style>
