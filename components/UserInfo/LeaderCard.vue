<template>
  <v-card class="leader-card">
    <div>
      <div class="user-icon__avatar">
        <v-img class="" :src="us.photoUrl(100)" />
      </div>
    </div>
    <div class="d-flex flex-column">
      <span class="primary--text f-text-large">{{ us.Username }}, {{ place }} {{ $t('leaderboard.place') }}</span>

      <span class="accent--text f-text"
        >{{ $t('leaderboard.totalGames') }}:
        <span class="primary--text">{{ us.TotalGames }}</span> {{ $t('leaderboard.totalWealth') }}: <span class="primary--text">{{ us.TotalWealth }}</span></span
      >
    </div>
    <div><AntHiveBtn @click="toProfile()" class="ml-6" color="accent">{{ $t("userInfo.profile") }}</AntHiveBtn></div>
  </v-card>
</template>

<script>
import { User } from '@/services/User'

export default {
  name: 'userChip',
  props: {
    leader: { type: Object, required: true },
    place: { type: Number, required: true }
  },
  data: () => ({
    us: null
  }),
  created() {
    this.us = new User()
    this.us.initUser(this.leader)
  },
  watch: {
    leader() {
      this.us = new User()
      this.us.initUser(this.leader)
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

.leader-card {
  max-width: 700px;
  padding: 12px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
  align-items: center;
}

.user-icon {
  &__avatar {
    width: 60px;
    height: 60px;
    border-radius: $border-radius-default;
    border: 2px solid $color-red-300;
    box-sizing: content-box;
  }
}
@media screen and (max-width: $screen-lg) {
  .user-icon {
    &__avatar {
      margin-right: 10px;
    }
  }
}
</style>
