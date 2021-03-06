<template>
  <div
    class="chip"
    @mouseover="$gtag('event', 'hbot_hover')">
    <div
      :style="`background: center / cover no-repeat url(${getBotAvatar(
        bot,
        200
      )})`"
      class="img"
    >
      <img
        :src="getLangImg(bot.lang)"
        alt="Bot Lang"
        class="bot-stat-icon lang-icon"
        width="35px"
      >
      <div
        v-if="bot.skin"
        :style="`background: center / cover no-repeat url(${getHiveSkinImg(
          bot.skin,
        )})`"
        class="bot-stat-icon">
        <img
          :src="getAntSkinImg(bot.skin)"
          alt="Bot Skin"
          class="bot-stat-icon"
          width="25px"
      ></div>
    </div>
    <div :class="{ fade: bot.isDead }" class="description">
      <div class="information">
        <nuxt-link
          v-if="bot.username"
          :to="localePath(`/users?username=${bot.username}`)"
          class="information-user"
          @click.native="$gtag('event', 'hbot_to_author')">
          {{ $t("game.by") }} {{ bot.username }}
          <v-avatar
            class="ml-1"
            tile
            size="30"
          ><v-img
            :src="getBotAuthorAvatar(bot, 60)"
          /></v-avatar>
        </nuxt-link>
        <div v-else class="information-user">
          {{ NA }}
          <v-avatar
            class="ml-1"
            tile
            size="30"
          ><v-img
            :src="getBotAuthorAvatar(bot, 60)"
          /></v-avatar>

        </div>
        <div class="information-container">
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
            {{ $t("userInfo.challangeMe") }}
          </AntHiveButton>
        </div>
      </div>
      <p class="name">
        <span class="display-name">{{
          getStringTruncated(bot.displayName, 9)
        }}</span>
        <span>v {{ bot.v }}</span>
      </p>
      <div class="statistics">
        <div class="statistic-container">
          <div class="statistic">
            <span>{{ $t("game.size") }}:</span>
            <span
              v-if="bot.ants"
              class="statistic-value"
            >{{ bot.ants.length }}</span
            >
          </div>
          <div class="statistic">
            <span>{{ $t("game.score") }}:</span>
            <span class="statistic-value">{{
              getNumberTruncated(bot.score)
            }}</span>
          </div>
        </div>
        <div class="statistic-container">
          <div class="statistic">
            <span>{{ $t("game.errors") }}:</span>
            <span class="statistic-value">{{
              getNumberTruncated(bot.errors)
            }}</span>
          </div>
          <div class="statistic">
            <span>{{ $t("global.rt") }}:</span>
            <span
              v-if="bot.response"
              class="statistic-value"
            >{{ getArtInMs(bot.response.time) }} ms</span
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Image from '@/mixins/image'
import Truncate from '@/mixins/truncate'
import AntHiveIcon from '@/components/AntHiveIcon'

export default {
  name: 'AntHiveBotHorizontal',
  components: {
    AntHiveIcon
  },
  mixins: [Image, Truncate],
  props: {
    bot: { type: Object, required: false, default: null }
  },
  data() {
    return {
      NA: 'N/A'
    }
  },
  methods: {
    getArtInMs(art) {
      return Math.round(art / 10) / 100
    },
    challange(botId) {
      this.$gtag('event', 'hbot_challange')
      const challangeUrl = `${process.env.PROFILE_URL}/new-game?challange=${botId}`
      window.location.href = challangeUrl
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/style/global.scss';
.chip {
  width: 100%;
  height: 100%;
  min-height: 115px;
  max-height: 120px;
  position: relative;
  display: flex;
  flex-direction: row;
  box-shadow: $box-shadow-default;
  background-color: $white;

  .img {
    background-position: center;
    min-width: 120px;
    display: flex;
    flex-direction: column;
  }

  .user-avatar {
    position: absolute;
    top: -20px;
    right: 10px;
  }

  .bot-stat-icon {
    border-bottom: 2px solid white;
    border-right: 2px solid white;
    margin-right: 10px;
    width: 35px;
    height: 35px;

    &.lang-icon {
      background-color: $white;
    }
  }

  .name {
    font-size: $font-medium;
    margin-bottom: 12px;
    .display-name {
      margin-right: 6px;
      font-weight: $font-weight-bold;
    }
    @media (min-width: $screen-md) and (max-width: $screen-lg) {
      margin-bottom: 0;
    }
  }

  .description {
    padding: 14px 20px 14px 20px;
    position: relative;
    width: 100%;
    transition: all 0.4s;
    @media (min-width: $screen-md) and (max-width: $screen-lg) {
      padding: 10px;
    }

    &.fade {
      opacity: 0.3;
    }

    &:hover,
    &:hover .information {
      opacity: 1;
    }
  }

  .statistics {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .statistic-container {
      width: 90px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .statistic {
      color: $violet;
      margin-bottom: 5px;
      font-size: $font-small;
      display: flex;
      justify-content: space-between;
      @media (min-width: $screen-md) and (max-width: $screen-lg) {
        margin-bottom: 0;
      }
    }
    .statistic-value {
      display: block;
      font-weight: $font-weight-bold;
    }
  }
  .information {
    position: absolute;
    top: 0;
    left: 0;
    min-width: 100%;
    height: 100%;
    transition: all 0.4s;
    opacity: 0;
    background: $black-transparent;

    .information-user {
      cursor: pointer;
      font-size: $font-small;
      color: $white;
      position: absolute;
      right: 0;
      padding: 10px;
    }

    .information-container {
      padding: 10px;
      width: fit-content;
      position: absolute;
      right: 0;
      bottom: 0;
    }

    .button {
      letter-spacing: 0;
    }
  }
}
</style>
