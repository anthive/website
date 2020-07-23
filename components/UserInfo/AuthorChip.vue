<template>
  <div class="d-flex align-center">
    <div>
      <div class="user-icon__avatar">
        <v-img class="" :src="photoUrl()" />
      </div>
    </div>
    <div class="ml-2 d-flex flex-column">
      <div class="d-flex align-center">
        <span class="primary--text f-text">{{ author }}</span>
      </div>

      <span class="accent--text">{{ getTimeAgo + $t(`games.${getTextTimeAgo}`) }}</span>
    </div>
  </div>
</template>


<script>
import { timeAgo } from '@/services/User'
export default {
  name: 'AuthorChip',
  props: {
    author: String,
    date: Number
  },
  methods: {
    photoUrl() {
      return 'https://github.com/' + this.author + '.png?size=50'
    }
  },
  computed: {
    getTimeAgo() {
      return timeAgo(this.date).time || ''
    },
    getTextTimeAgo() {
      return timeAgo(this.date).text
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/style/global.scss';

.user-icon {
  &__avatar {
    border-radius: $border-radius-default;
    width: 50px;
    height: 50px;
    border: 2px solid $color-red-400;
    box-sizing: content-box;
    background-color: white;
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
</style>
