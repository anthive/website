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
      <v-img :src="getAvatar(player.avatar)" />
    </v-avatar> -->
    <p class="mb-1"><strong>{{ bot.displayName }}</strong></p>
    <div class="statistics">
      <div class="mr-5">
        <p>{{ $t("game.ant") }}/{{ $t("game.hive") }}: <strong>{{ bot.stats.ants }}/{{ bot.stats.hive }}</strong></p>
        <p>{{ $t("game.score") }}: <strong>{{ bot.stats.score }}</strong></p>
      </div>
      <div>
        <p>{{ $t("game.art") }}: <strong>{{ getArtInMs(bot.stats.art) }} ms</strong></p>
        <p>{{ $t("game.errors") }}: <strong>{{ bot.stats.errors }}</strong></p>
      </div>
    </div>
   </div>
 </div>
</template>

<script>
import Image from '@/mixins/image'
export default {
  name: 'AntHiveBotHorizontal',
  props: {
    bot: Object
  },
  mixins: [Image],
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

  & .img {
    background-position: center;
    width: 120px;
    background: $color-red-300;
  }

  & .user-avatar {
    position: absolute;
    top: -20px;
    right: 10px;
  }

  & .lang-icon {
    border-bottom: 2.5px solid white;
    border-right: 2.5px solid white;
    margin-right: 10px;
  }

  & .lang-name {
    font-size: $font-small;
    color: $color-violet-600;
  }

  & .description {
    position: relative;
    padding: 20px 13px;
  }

  & .statistics {
    margin-top: 12px;
    display: flex;
    p {
      margin-bottom: 0;
      font-size: $font-medium;
    }
  }
}
</style>
