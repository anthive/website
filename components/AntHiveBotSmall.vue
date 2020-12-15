<template>
  <div>
    <div class="user-icon__avatar">
      <v-img :src="getAvatar(player.avatar, 100)" />
    </div>
  </div>
</template>

<script>
import Image from '@/mixins/image'
export default {
  name: 'GamesUsersIcon',
  props: {
    player: Object
  },
  mixins: [Image]
}
</script>

<style scoped lang="scss">
@import '@/assets/style/global.scss';

.user-icon {
  &__avatar {
    cursor: pointer;
    width: 32px;
    height: 32px;
    border: 2px solid $color-violet-650;
    box-sizing: content-box;
  }
}
</style>
