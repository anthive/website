<template>
  <div>
    <div class="user-icon__avatar">
      <v-img :src="getAvatar(player.avatar)" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'GamesUsersIcon',
  props: {
    player: Object
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

.user-icon {
  &__avatar {
    cursor: pointer;
    width: 32px;
    height: 32px;
    border: 2px solid $color-red-400;
    box-sizing: content-box;
  }
}
</style>
