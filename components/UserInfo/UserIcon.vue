<template>
  <div>
    <div class="user-icon__avatar">
      <v-img class="" :src="us.photoUrl(100)" />
    </div>
  </div>
</template>

<script>
import { User } from '@/services/User'

export default {
  name: 'usersInfo',
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

.user-icon {
  &__avatar {
    width: 32px;
    height: 32px;
    border-radius: $border-radius-default;
    border: 2px solid $color-red-400;
    box-sizing: content-box;
  }
}
</style>
