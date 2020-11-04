<template>
  <div class="px-3">
    <v-row class="leader-card">
      <v-col cols="2" sm="1" class="leader-card__places">
        <AntHiveIcon
          color="#362d59"
          big
          v-if="place === 1"
          >rank1</AnthiveIcon
        >
        <AntHiveIcon
          color="#362d59"
          big
          v-else-if="place === 2"
          >rank2</AnthiveIcon
        >
        <AntHiveIcon
          color="#362d59"
          big
          v-else-if="place === 3"
          >rank3</AnthiveIcon
        >
        <span v-else class="leader-card__place-text">{{ place }}</span>
      </v-col>
      <v-col cols="6" sm="6">
        <div>
          <div class="leader-card__avatar-name">
            <v-img class="leader-card__avatar" :src="getAvatar(leader.avatar)" />
            <span class="leader-card__name">{{ leader.displayName }}</span>
          </div>
        </div>
      </v-col>
      <v-col cols="2" sm="1" class="leader-card__score">{{ leader.gamesPlayed }} <div v-if="$vuetify.breakpoint.smAndDown">{{ leader.score }}</div></v-col>
      <v-col v-if="!$vuetify.breakpoint.smAndDown" cols="2" sm="2" class="leader-card__score">{{ leader.score }}</v-col>
      <v-col v-if="!$vuetify.breakpoint.smAndDown" cols="2" sm="2" class="leader-card__score">{{ leader.v }}</v-col>
    </v-row>
  </div>
</template>

<script>
import AntHiveIcon from '@/components/AntHiveIcon'

export default {
  name: 'GamesLeaderCard',
  components: {
    AntHiveIcon
  },
  props: {
    leader: { type: Object, required: true },
    place: { type: Number, required: true }
  },
  methods: {
    getAvatar(id) {
      return `${process.env.API_URL}images/${id}/100/100`
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/style/global.scss';

.leader-card {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: -1px;
  border-top: 1px solid $color-red-300;

  &__place-icon {
    width: 36px;
  }

  &__place-text {
    font-size: 22px;
    font-weight: 500;
    padding-left: 11px;
  }

  &__avatar-name {
    display: flex;
    padding-left: 20px;
  }

  &__name {
    font-weight: 500;
    margin-left: 10px;
    line-height: 60px;
  }

  &__avatar {
    min-width: 60px;
    min-height: 60px;
    max-width: 60px;
    max-height: 60px;
    border-radius: $border-radius-default;
    border: 2px solid $color-red-300;
    box-sizing: content-box;
  }

  &__score {
    text-align: right;
  }
}
@media screen and (max-width: $screen-md) {
  .leader-card {
    &__score {
      text-align: center;
    }
    &__avatar-name {
      padding-left: 0;
    }
    &__name {
      line-height: normal;
      padding-top: 12px;
    }
  }
}
</style>
