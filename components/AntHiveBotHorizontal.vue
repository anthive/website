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
    <p class="name"><strong>{{ getStringTruncated(bot.displayName, 10) }}</strong> v {{ bot.v }}</p>
    <div class="statistics">
      <div class="mr-12">
        <p>{{ $t("game.ant") }}/{{ $t("game.hive") }}: <strong>{{ bot.stats.ants }}/{{ bot.stats.hive }}</strong></p>
        <p>{{ $t("game.score") }}: <strong>{{ getNumberTruncatedToThousand(bot.stats.score) }}</strong></p>
      </div>
      <div>
        <p>{{ $t("game.errors") }}: <strong>{{ getNumberTruncatedToThousand(bot.stats.errors) }}</strong></p>
        <p>{{ $t("game.art") }}: <strong>{{ getArtInMs(bot.stats.art) }} ms</strong></p>
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
  min-width: 450px;
  display: flex;
  flex-direction: row;
  box-shadow: $box-shadow-default;
  height: 120px;
  background-color: $color-white;

  .img {
    background-position: center;
    width: 120px;
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
  }

  .description {
    position: relative;
    padding: 20px 13px;
  }

  .statistics {
    margin-top: 12px;
    display: flex;
    p {
      margin-bottom: 0;
      font-size: $font-medium;
    }
  }
}
</style>
