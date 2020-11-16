<template>
 <div class="chip">
   <div class="chip__img" :style="`background: url(${hiveUrl(player.skin)})`">
     <img
        class="chip__lang-icon"
        width="40px"
        :src="langUrl(player.lang)"
        :alt="player.lang" 
      />
   </div>

   <div class="chip__description">
    <v-avatar class="chip__user-avatar" size="40">
      <v-img :src="getAvatar(player.avatar)" />
    </v-avatar>
    <p class="mb-5"><strong>{{ player.name }}</strong></p>
    <div class="chip__statistics">
      <p>{{ $t("game.ants") }}: <strong>{{ player.stats.ants }}</strong></p>
      <p>{{ $t("game.hiveSize") }}: <strong>{{ player.stats.hive }}</strong></p>
      <p>{{ $t("game.score") }}: <strong>{{ player.stats.score }}</strong></p>
      <p>{{ $t("game.errors") }}: <strong>{{ player.stats.errors }}</strong></p>
      <p>{{ $t("game.art") }}: <strong>{{ player.stats.art }}</strong></p>
      <p>{{ $t("game.age") }}: <strong>{{ player.stats.age }}</strong></p>
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
      return `${process.env.API_URL}images/${id}/100/100`
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
  flex-direction: column;
  box-shadow: $box-shadow-default;
  width: 190px;
  height: 340px;

  &__img {
    background-position: center;
    width: 100%;
    min-height: 130px;
    background: $color-red-300;
    padding: 10px;
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
    padding: 20px;
  }

  &__statistics {
    p {
      margin-bottom: 0;
      font-size: 12px;
    }
  }
}
</style>
