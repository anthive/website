<template>
  <div>
    <v-avatar class="user-icon__avatar" size="32">
      <v-img class="" :src="us.photoUrl(100)"></v-img>
    </v-avatar>
  </div>
</template>

<script>
import { User } from '@/services/User'

export default {
  name: 'usersInfo',
  props: {
    player: Object,
    locale: String,
    number: Number,
    isOpened: Boolean
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
.user-icon {
  &__avatar {
    border: 2px solid $color-accent;
    box-sizing: content-box;
  }
}
</style>
