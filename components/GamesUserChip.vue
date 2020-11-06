<template>
 <div class="chip">
   <div class="chip__img" :style="`background: center / cover no-repeat url(${hiveUrl(player.skin)})`">
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
      <p>Ants: <strong>{{ player.stats.ants }}</strong></p>
      <p>Hive size: <strong>{{ player.stats.hive }}</strong></p>
      <p>{{ $t("game.score") }}: <strong>{{ player.stats.score }}</strong></p>
      <p>{{ $t("game.errors") }}: <strong>{{ player.stats.errors }}</strong></p>
      <p>{{ $t("game.art") }}: <strong>{{ player.stats.art }}</strong></p>
      <p>{{ $t("game.age") }}: <strong>{{ player.stats.age }}</strong></p>
    </div>
   </div>
 </div>
  <!-- <v-card tile class="user-chip">
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
  </v-card> -->
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
    border-radius: 10px;
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
