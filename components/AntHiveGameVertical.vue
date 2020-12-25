<template>
 <div class="chip">
   <div class="header">
     <div class="author-info">
        <p class="time-ago">{{ getTimeAgo.time + $t(`games.${getTimeAgo.text}`) }}</p>
     </div>
     <v-avatar
        v-if="game.author.avatar"
        tile
        class="author-avatar"
        size="30"
      >
        <v-img :src="getAvatar(game.author.avatar, 60)" />
      </v-avatar>
    </div>
    <div class="bots">
      <nuxt-link
        :to="localePath(`/users/${bot.username}`)"
        v-for="(bot, index) in game.bots"
        :key="index"
        class="bot-avatar"
      >
        <v-avatar tile size="35">
          <v-img :src="getAvatar(bot.avatar, 70)" />
        </v-avatar>
      </nuxt-link>
    </div>
    <v-row>
      <v-col class="game-info" cols="12" sm="6">{{ $t("game.age") }}:</v-col>
      <v-col class="game-info ticks" cols="12" sm="6">{{ game.age }} {{ $t("game.ticks") }}</v-col>
    </v-row>
    <v-row class="mb-3">
      <v-col class="game-info" cols="12" sm="6">{{ $t("game.mapSkin") }}:</v-col>
      <v-col class="game-info" cols="12" sm="6">
        <v-img
          width="20"
          :src="getImage(game.mapSettings.theme)"
          alt="map theme"
        />
      </v-col>
    </v-row>
    <AntHiveButton
      class="button"
      tile
      color="primary"
      :to="localePath({ name: 'game', query: { id: game.id, v: game.v }})"
    >
      {{ $t("game.viewReplay") }}
    </AntHiveButton>
  </div>
</template>

<script>
import Image from '@/mixins/image'
import { getImageById } from '@/services/Image'
import { timeAgo } from '@/services/User'

export default {
  name: 'AntHiveGameVertical',
  mixins: [Image],
  props: {
    game: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  computed: {
    getTimeAgo() {
      return timeAgo(this.game.finished)
    }
  },
  methods: {
    getImage(id) {
      return getImageById(`${id}-background.png`, 40)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';

.chip {
  width: 100%;
  max-width: 200px;
  margin: 20px;
  padding: 10px 20px 20px;
  display: flex;
  flex-direction: column;
  box-shadow: $box-shadow-default;
  background-color: $color-white;
}

.author-name,
.time-ago,
.game-info {
  font-size: $font-medium;
  color: $color-violet-700;
  margin: 0;
  line-height: $font-big;
}

.game-info {
  padding: 5px 12px;
}

.ticks {
  font-weight: $font-weight-bold;
}

.header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;

  .author-info {
    text-align: right;
  }

  .time-ago {
    font-size: $font-small;
    color: $color-violet-350;
  }

  .author-avatar {
    margin-left: 6px;
  }
}

.bots {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -6px 8px;

  .bot-avatar {
    margin: 0 5px 10px;
    cursor: pointer;
  }
}

.game-info-row {
  display: flex;
  justify-content: space-between;
}

.button {
  max-width: 145px;
  width: 100%;
  margin: 0 auto;
}
</style>
