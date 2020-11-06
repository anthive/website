<template>
  <div class="user-chip">
    <div>
      <v-avatar tile class="user-chip__avatar" size="32">
        <v-img :src="getAvatar(player.avatar)" />
      </v-avatar>
    </div>
    <div class="ml-2 d-flex flex-column">
      <div class="d-flex align-center">
        <div>
          <div class="d-flex align-center">
             <v-avatar tile class="mr-2" size="23">
              <v-img :src="langUrl(player.lang)" />
            </v-avatar>
            <div class="user-chip__name primary--text">{{ player.name }}</div>
            <v-avatar class="ml-1" size="23">
              <span class="user-chip__version">v.{{ player.version }}</span>
            </v-avatar>
            <v-avatar tile size="23">
              <v-img :src="antUrl(player.skin)" />
            </v-avatar>
            <span class="mx-1">:{{ player.stats.ants }}</span>
            <v-avatar tile size="23">
              <v-img :src="hiveUrl(player.skin)" />
            </v-avatar>
            <span class="mx-1">:{{ player.stats.hive }}</span>
          </div>

          <div>
            {{ $t("game.score") }}: {{ player.stats.score }}, {{ $t("game.errors") }}: {{ player.stats.errors }},
            {{ $t("game.art") }}: {{ player.stats.art }}, {{ $t("game.age") }}: {{ player.stats.age }}
          </div>
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
.user-chip {
  font-size: $font-small;
  min-width: 230px;
  display: flex;
  align-items: center;
  &__avatar {
    border: 2px solid $color-red-400;
    border-radius: $border-radius-default !important;
    box-sizing: content-box;
  }
  &__info {
    display: flex;
    align-items: center;
  }
  &__ant-img {
    background-color: white;
    background: #e1567c0d;
    box-sizing: border-box;
  }
  &__version {
    font-size: 10px;
    margin: 0 1px;
  }
}
@media screen and (max-width: $screen-sm) {
  .user-chip {
    &__info {
      flex-direction: column;
    }
  }
}
</style>
