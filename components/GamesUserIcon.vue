<template>
  <div>
    <div class="user-icon__avatar">
      <v-img :src="us.photoUrl(100)" />
    </div>
  </div>
</template>

<script>
import { User } from '@/services/User'

export default {
  name: 'GamesUsersInfo',
  props: {
    player: Object,
    locale: String
  },
  data: () => ({
    us: null,
    bot: {}
  }),
  created() {
    this.bot = Object.keys(this.player).reduce((c, k) => ((c[k.toLowerCase()] = this.player[k]), c), {})
    this.us = new User()
    this.us.initUser(this.bot)
  },
  watch: {
    player() {
      this.bot = Object.keys(this.player).reduce((c, k) => ((c[k.toLowerCase()] = this.player[k]), c), {})
      this.us = new User()
      this.us.initUser(this.bot)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/style/global.scss';

.user-icon {
  &__avatar {
    cursor: pointer;
    width: 32px;
    height: 32px;
    border-radius: $border-radius-default;
    border: 2px solid $color-red-400;
    box-sizing: content-box;
  }
}
</style>
