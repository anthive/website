<template>
 <div class="chip">
   <div class="chip__img" :style="`background: center / cover no-repeat url(${getAvatar(player.avatar)})`">
     <img
        class="chip__lang-icon"
        width="30px"
        :src="langUrl(player.lang)"
        :alt="player.lang" 
      />
   </div>

   <div class="chip__description">
     <!-- TODO: user user avatar -->
    <!-- <v-avatar tile class="chip__user-avatar" size="40">
      <v-img :src="getAvatar(player.avatar)" />
    </v-avatar> -->
    <p class="mb-1"><strong>{{ player.displayName }}</strong></p>
    <div class="chip__statistics">
      <div class="mr-5">
        <p>{{ $t("game.ants") }}: <strong>{{ player.stats.ants }}</strong></p>
        <p>{{ $t("game.hiveSize") }}: <strong>{{ player.stats.hive }}</strong></p>
        <p>{{ $t("game.score") }}: <strong>{{ player.stats.score }}</strong></p>
      </div>
      <div>
        <p>{{ $t("game.art") }}: <strong>{{ player.stats.art }}</strong></p>
        <p>{{ $t("game.age") }}: <strong>{{ player.stats.age }}</strong></p>
        <p>{{ $t("game.errors") }}: <strong>{{ player.stats.errors }}</strong></p>
      </div>
    </div>
   </div>
 </div>
</template>

<script>
export default {
  name: 'GamesUserChip',
  props: {
    player: Object
  },
  methods: {
    getAvatar(id) {
      return `${process.env.API_URL}/images/${id}/100/100`
    },
    langUrl(lang) {
      return '/skins/lang/' + lang + '.png'
    },
    antUrl(skin) {
      return '/skins/client/' + skin + '/ant.png'
    },
    hiveUrl(skin) {
      return '/skins/client/' + skin + '/hive.png'
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
  height: 100px;

  &__img {
    background-position: center;
    width: 100px;
    background: $color-red-300;
  }

  &__user-avatar {
    position: absolute;
    top: -20px;
    right: 10px;
  }

  &__lang-icon {
    margin-right: 10px;
  }

  &__lang-name {
    font-size: 10px;
    color: $color-violet-600;
  }

  &__description {
    position: relative;
    padding: 10px;
  }

  &__statistics {
    display: flex;
    p {
      margin-bottom: 0;
      font-size: 12px;
    }
  }
}
</style>
