<template>
  <v-card class="py-3 mx-auto d-flex justify-center align-center" width="700px">
    <div>
      <v-avatar class="user-icon__avatar" size="60">
        <v-img class="" :src="us.photoUrl(100)" />
      </v-avatar>
    </div>
    <div class="d-flex flex-column">
      <span class="primary--text f-text-large">{{ us.Username }}, {{place}} place</span>

      <span class="accent--text f-text"
        >Total games played:
        <span class="primary--text">{{ us.TotalGames }}</span> Total wealth
        earned: <span class="primary--text">{{ us.TotalWealth }}</span></span
      >
    </div>
    <div><AntHiveBtn @click="toProfile()" class="ml-6" primary fill>{{$t("userInfo.profile")}}</AntHiveBtn></div>
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
.user-icon {
  &__avatar {
    border: 2px solid $color-red-400;
    box-sizing: content-box;
    margin: 0 15px;
  }
}
</style>
