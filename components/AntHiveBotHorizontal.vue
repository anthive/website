<template>
  <div class="chip">
    <div
      class="img"
      :style="`background: center / cover no-repeat url(${getAvatar(
        bot.avatar,
        200
      )})`"
    >
      <img
        class="lang-icon"
        width="35px"
        :src="getLangImg(bot.lang)"
        :alt="bot.lang"
      />
    </div>
    <div class="description">
      <div :class="{ show: botIsDead }" class="information">
        <nuxt-link :to="localePath(`/users/${bot.username}`)" class="information-user">
          {{ $t("game.by") }} {{ bot.username }}
          <v-avatar class="ml-1" tile size="30"
            ><v-img :src="getAvatar(bot.userAvatar, 200)"
          /></v-avatar>
        </nuxt-link>
        <div class="information-container">
          <AntHiveButton
            class="button"
            tile
            color="primary"
            @click="challange(bot.id)"
          >
            <AntHiveIcon icon="challange" class="mx-1" small color="white" />
            {{ $t("userInfo.challangeMe") }}
          </AntHiveButton>
        </div>
      </div>
      <!-- TODO: user user avatar -->
      <!-- <v-avatar tile class="user-avatar" size="40">
      <v-img :src="getAvatar(bot.avatar, 100)" />
    </v-avatar> -->
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
            <span class="statistic-value"
              >{{ botStats.hive }}/{{ botStats.ants }}</span
            >
          </div>
          <div class="statistic">
            <span>{{ $t("game.score") }}:</span>
            <span class="statistic-value">{{
              getNumberTruncatedToThousand(botStats.score)
            }}</span>
          </div>
        </div>
        <div class="statistic-container">
          <div class="statistic">
            <span>{{ $t("game.errors") }}:</span>
            <span class="statistic-value">{{
              getNumberTruncatedToThousand(botStats.errors)
            }}</span>
          </div>
          <div class="statistic">
            <span>{{ $t("game.rt") }}:</span>
            <span class="statistic-value"
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
  mixins: [Image, Truncate],
  methods: {
    getArtInMs(art) {
      return Math.round(art / 10) / 100
    },
    challange(botId) {
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
  background-color: $color-white;

  .img {
    background-position: center;
    min-width: 120px;
    background: $color-red-300;
  }

  .user-avatar {
    position: absolute;
    top: -20px;
    right: 10px;
  }

  .lang-icon {
    border-bottom: 2px solid white;
    border-right: 2px solid white;
    background-color: white;
    margin-right: 10px;
  }

  .lang-name {
    font-size: $font-small;
    color: $color-violet-600;
  }

  .name {
    font-size: $font-big;
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
    @media (min-width: $screen-md) and (max-width: $screen-lg) {
      padding: 10px;
    }
  }

  .statistics {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .statistic-container {
      width: 80px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .statistic {
      color: $color-violet-700;
      margin-bottom: 5px;
      font-size: $font-medium;
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
    background: $color-black-transparent;

    &:hover,
    &.show {
      opacity: 1;
    }

    .information-user {
      cursor: pointer;
      font-size: $font-medium;
      color: $color-white;
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
