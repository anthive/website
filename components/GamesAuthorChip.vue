<template>
  <div class="d-flex align-center">
    <div class="ml-12 d-flex flex-column">
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
  name: 'GamesAuthorChip',
  props: {
    author: String,
    date: Number
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
