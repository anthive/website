<template>
  <v-card class="user-card">
    <v-img
      class="user-card__img"
      width="380"
      height="125"
      src="/img/bg.jpg"
    ></v-img>
    <div class="user-card__container">
      <div class="user-card__avatar-container">
        <v-avatar class="user-card__avatar" size="80">
          <v-img :src="us.photoUrl(80)"></v-img>
        </v-avatar>
      </div>
      <div class="user-card__user_info">
        <span class="primary--text f-text-large d-block text-center">{{
          player.Username
        }}</span>
        
      </div>
      <div class="user-card__bot-info">
        <v-avatar class="user-card__bot-info-icon" size="50">
          <v-img :src="us.antUrl(true)"> </v-img>
        </v-avatar>
        <v-avatar class="user-card__bot-info-icon" size="50">
          <v-img :src="us.langUrl(us.Lang)"></v-img>
        </v-avatar>
        <v-avatar class="user-card__bot-info-icon" size="50">
          <span class="user-icon__version">v.{{ us.Version }}</span>
        </v-avatar>
      </div>
      <span class="f-text-large text-center d-block primary--text">{{ $t("infoBotInfo") }}</span>
      <div class="user-card__user-stats">
        <div class="user-card__user-stat">
          <span class="user-card__user-stat-value">{{
            player.Stats.Ants
          }}</span>
          <span class="user-card__user-stat-key">{{ $t("infoAnts") }}</span>
        </div>
        <div class="user-card__user-stat">
          <span class="user-card__user-stat-value"
            >Y{{ player.Y }}, X{{ player.X }}</span
          >
          <span class="user-card__user-stat-key">{{ $t("infoSpan") }}</span>
        </div>
        <div class="user-card__user-stat">
          <span class="user-card__user-stat-value">{{ player.Stats.Age }}</span>
          <span class="user-card__user-stat-key">{{ $t("infoTicks") }}</span>
        </div>
        <div class="user-card__user-stat">
          <span class="user-card__user-stat-value">{{
            player.Stats.Hive
          }}</span>
          <span class="user-card__user-stat-key">{{ $t("infoHiveSize") }}</span>
        </div>
        <div class="user-card__user-stat">
          <span class="user-card__user-stat-value">{{
            player.Stats.Errors
          }}</span>
          <span class="user-card__user-stat-key">{{ $t("infoErrors") }}</span>
        </div>
        <div class="user-card__user-stat">
          <span class="user-card__user-stat-value">{{
                  player.Wealth
                }}</span>
          <span class="user-card__user-stat-key">{{
                  $t("infoEarned")
                }}</span>
        </div>
      </div>
      <div class="user-card__actions">
        <AntHiveBtn class="mx-auto my-2 d-block" fill>{{
                  $t("infoProfile")
                }}</AntHiveBtn>
      </div>
    </div>
  </v-card>
</template>



<script>
import { User } from '@/services/User'

export default {
  name: 'userChip',
  props: {
    player: Object,
    locale: String
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
    display: block;
    margin: -50px auto 0 auto;
    border: 3px solid $color-accent;
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
    color: $color-accent;
    font-weight: 700;
  }
  &__user-stat-value {
    color: $color-primary;
    font-weight: 500;
  }
}
</style>
