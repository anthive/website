<template>
  <div class="user-chip">
    <div>
      <v-avatar tile class="user-chip__avatar" size="32">
        <v-img class="" :src="us.photoUrl(100)" />
      </v-avatar>
    </div>
    <div class="ml-2 d-flex flex-column">
        <div class="d-flex align-center">
          <span class="user-chip__name primary--text f-text">{{ us.Username }}</span>
          <v-avatar class="user-chip__ant-img" size="18">
            <v-img :src="us.antUrl(true)"> </v-img>
          </v-avatar>
          <v-avatar size="18">
            <v-img :src="us.langUrl(us.Lang)" />
          </v-avatar>
          <v-avatar class="ml-1" size="23">
            <span class="user-chip__version">v.{{ us.Version }}</span>
          </v-avatar>
        </div>
    </div>
  </div>
</template>



<script>
import { User } from '@/services/User'

export default {
  name: 'GamesUserChip',
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
      this.us = new User()
      this.us.initUser(this.bot)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/style/global.scss';
.user-chip {
  min-width: 230px;
  display: flex;
  align-items: center;
  &__avatar {
    border: 2px solid $color-red-400;
    border-radius: $border-radius-default !important;
    box-sizing: content-box;
  }
  &__name {
    width: 100%;
  }
  &__info {
    display: flex;
    align-items: center;
  }
  &__ant-img {
    background-color: white;
    background: #e1567c0d;
    box-sizing: border-box;
  }
  &__version {
    font-size: 10px;
    margin: 0 1px;
  }
}
@media screen and (max-width: $screen-sm) {
  .user-chip {
    &__info {
      flex-direction: column;
    }
  }
}
</style>
