<template>
  <v-card class="user-card" width="380">
    <v-img
      class="user-card__img"
      width="380"
      height="125"
      src="/img/bg.webp"
    />
    <div class="user-card__container">
      <!-- Avatar container -->
      <div class="user-card__avatar-container">
        <div class="user-card__avatar">
          <v-img :src="us.photoUrl(80)" />
        </div>
      </div>
      <!-- Username container -->
      <div class="user-card__user_info">
        <span class="primary--text f-text-large d-block text-center">{{
          player.Username
        }}</span>
      </div>
      <!-- Leaderboard place -->
      <div v-if="place != 0" class="user-card__user_info">
        <span class="accent--text f-text-large d-block text-center"
          >{{ place }} place</span
        >
      </div>
      <!-- Bot settings -->
      <div v-if="us.Lang" class="user-card__bot-info">
        <v-avatar class="user-card__bot-info-icon" size="50">
          <v-img :src="us.antUrl(true)" />
        </v-avatar>
        <v-avatar class="user-card__bot-info-icon" size="50">
          <v-img :src="us.langUrl(us.Lang)" />
        </v-avatar>
        <v-avatar class="user-card__bot-info-icon" size="50">
          <span class="user-icon__version">v.{{ us.Version }}</span>
        </v-avatar>
      </div>
      <span
        v-if="player.Stats.Ants"
        class="f-text-large text-center d-block primary--text"
        >{{ $t("userInfo.botInfo") }}</span
      >
      <!-- Leaderboard stats -->
      <div v-if="player.TotalWealth" class="user-card__user-stats">
        <div class="user-card__user-stat">
          <span class="user-card__user-stat-value">{{
            player.TotalGames
          }}</span>
          <span class="user-card__user-stat-key">Total Games</span>
        </div>
        <div class="user-card__user-stat">
          <span class="user-card__user-stat-value">{{
            player.TotalWealth
          }}</span>
          <span class="user-card__user-stat-key">Total Wealth</span>
        </div>
      </div>
      <!-- Games stats -->
      <div v-if="player.Stats.Ants" class="user-card__user-stats">
        <div class="user-card__user-stat">
          <span class="user-card__user-stat-value">{{
            player.Stats.Ants
          }}</span>
          <span class="user-card__user-stat-key">{{ $t("userInfo.ants") }}</span>
        </div>
        <div class="user-card__user-stat">
          <span class="user-card__user-stat-value"
            >Y{{ player.Y }}, X{{ player.X }}</span
          >
          <span class="user-card__user-stat-key">{{ $t("userInfo.span") }}</span>
        </div>
        <div class="user-card__user-stat">
          <span class="user-card__user-stat-value">{{ player.Stats.Age }}</span>
          <span class="user-card__user-stat-key">{{ $t("userInfo.ticks") }}</span>
        </div>
        <div class="user-card__user-stat">
          <span class="user-card__user-stat-value">{{
            player.Stats.Hive
          }}</span>
          <span class="user-card__user-stat-key">{{ $t("userInfo.hiveSize") }}</span>
        </div>
        <div class="user-card__user-stat">
          <span class="user-card__user-stat-value">{{
            player.Stats.Errors
          }}</span>
          <span class="user-card__user-stat-key">{{ $t("userInfo.errors") }}</span>
        </div>
        <div class="user-card__user-stat">
          <span class="user-card__user-stat-value">{{ player.Wealth }}</span>
          <span class="user-card__user-stat-key">{{ $t("userInfo.earned") }}</span>
        </div>
      </div>
      <!-- Actions -->
      <div class="user-card__actions">
        <AntHiveBtn @click="toProfile()" class="mx-auto my-2 d-block" color="accent">{{
          $t("userInfo.profile")
        }}</AntHiveBtn>
      </div>
    </div>
  </v-card>
</template>

<script>
import { User } from '@/services/User'

export default {
  name: 'userCard',
  props: {
    player: { type: Object, required: true },
    place: { type: Number, default: 0 }
  },
  data: () => ({
    us: null
  }),
  created() {
    this.us = new User()
    this.us.initUser(this.player)
  },
  watch: {
    player() {
      this.us = new User()
      this.us.initUser(this.player)
    }
  },
  methods: {
    toProfile() {
      this.$router.push(`/user/?username=${this.us.Username}`)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/style/global.scss';
.user-card {
  border-radius: 12px !important;
  &__img {
    border-bottom-right-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }
  &__container {
    padding: 5px 10px;
  }
  &__avatar {
    width: 80px;
    height: 80px;
    border-radius: $border-radius-default;
    background-color: $color-red-300;
    position: relative;
    margin: -50px auto 0 auto;
    border: 3px solid $color-red-300;
    box-sizing: content-box;
  }
  &__bot-info {
    display: flex;
    justify-content: space-around;
    width: 250px;
    margin: 15px auto;
  }
  &__bot-info-icon {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  }
  &__user-stats {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    width: 300px;
    margin: 15px auto;
  }
  &__user-stat {
    text-align: center;
    margin: 5px 20px;
    display: flex;
    min-width: 100px;
    flex-direction: column;
  }
  &__user-stat-key {
    color: $color-red-300;
    font-weight: 500;
  }
  &__user-stat-value {
    color: $color-violet-900;
    font-weight: 500;
  }
}
</style>
