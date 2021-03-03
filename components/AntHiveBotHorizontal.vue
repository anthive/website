<template>
  <div
    class="chip"
    @mouseover="$gtag('event', 'hbot_hover')">
    <div
      :style="`background: center / cover no-repeat url(${getAvatar(
        bot.avatar,
        200
      )})`"
      class="img"
    >
      <img
        :src="getLangImg(bot.lang)"
        :alt="bot.lang"
        class="bot-stat-icon lang-icon"
        width="35px"
      >
      <div
        :style="`background: center / cover no-repeat url(${getHiveSkinImg(
          bot.skin,
        )})`"
        class="bot-stat-icon">
        <img
          :src="getAntSkinImg(bot.skin)"
          :alt="bot.skin"
          class="bot-stat-icon"
          width="25px"
      ></div>
    </div>
    <div :class="{fade: isDead}" class="description">
      <div class="information">
        <nuxt-link
          :to="localePath(`/users?username=${bot.username}`)"
          class="information-user"
          @click.native="$gtag('event', 'hbot_to_author')">
          {{ $t("game.by") }} {{ bot.username }}
          <v-avatar
            class="ml-1"
            tile
            size="30"
          ><v-img
            :src="getAvatar(bot.userAvatar, 60)"
          /></v-avatar>
        </nuxt-link>
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
          getStringTruncated(bot.displayName, 10)
        }}</span>
        <span>v {{ bot.v }}</span>
      </p>
      <div v-if="botStats" class="statistics">
        <div class="statistic-container">
          <div class="statistic">
            <span>{{ $t("game.size") }}:</span>
            <span
              class="statistic-value"
            >{{ botStats.hive }}/{{ botStats.ants }}</span
            >
          </div>
          <div class="statistic">
            <span>{{ $t("game.score") }}:</span>
            <span class="statistic-value">{{
              getNumberTruncated(botStats.score)
            }}</span>
          </div>
        </div>
        <div class="statistic-container">
          <div class="statistic">
            <span>{{ $t("game.errors") }}:</span>
            <span class="statistic-value">{{
              getNumberTruncated(botStats.errors)
            }}</span>
          </div>
          <div class="statistic">
            <span>{{ $t("game.art") }}:</span>
            <span
              class="statistic-value"
            >{{ getArtInMs(botStats.art) }} ms</span
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
    bot: { type: Object, required: true },
    stats: { type: Object, required: true },
    isDead: { type: Boolean, required: true }
  },
  computed: {
    botStats() {
      return this.stats
    },
    botIsDead() {
      return this.isDead
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
