<template>
 <div class="chip">
   <div class="img" :style="`background: center / cover no-repeat url(${getAvatar(bot.avatar, 200)})`">
     <img
        class="lang-icon"
        width="35px"
        :src="getLangImg(bot.lang)"
        :alt="bot.lang" 
      />
   </div>

   <div class="description">
     <!-- TODO: user user avatar -->
    <!-- <v-avatar tile class="user-avatar" size="40">
      <v-img :src="getAvatar(bot.avatar)" />
    </v-avatar> -->
    <p class="name"><span class="display-name">{{ getStringTruncated(bot.displayName, 10) }}</span> <span>v {{ bot.v }}</span></p>
    <div class="statistics">
      <div class="statistic-container">
        <div class="statistic"><span>{{ $t("game.size") }}:</span> <span class="statistic-value">{{ bot.stats.hive }}/{{ bot.stats.ants }}</span></div>
        <div class="statistic"><span>{{ $t("game.score") }}:</span> <span class="statistic-value">{{ getNumberTruncatedToThousand(bot.stats.score) }}</span></div>
      </div>
      <div class="statistic-container">
        <div class="statistic"><span>{{ $t("game.errors") }}:</span> <span class="statistic-value">{{ getNumberTruncatedToThousand(bot.stats.errors) }}</span></div>
        <div class="statistic"><span>{{ $t("game.rt") }}:</span> <span class="statistic-value">{{ getArtInMs(bot.stats.art) }} ms</span></div>
      </div>
    </div>
   </div>
 </div>
</template>

<script>
import Image from '@/mixins/image'
import Truncate from '@/mixins/truncate'

export default {
  name: 'AntHiveBotHorizontal',
  props: {
    bot: Object
  },
  mixins: [Image, Truncate],
  methods: {
    getArtInMs(art) {
      return Math.round(art / 10) / 100
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/style/global.scss';
.chip {
  display: flex;
  flex-direction: row;
  box-shadow: $box-shadow-default;
  height: 120px;
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
    position: relative;
    padding: 14px 20px 14px 20px;
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
}
</style>
