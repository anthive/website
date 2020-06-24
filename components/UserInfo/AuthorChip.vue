<template>
  <div class="d-flex align-center">
    <div>
      <v-avatar class="user-icon__avatar" size="32">
        <v-img class="" :src="photoUrl()" />
      </v-avatar>
    </div>
    <div class="ml-2 d-flex flex-column">
      <div class="d-flex align-center">
        <span class="primary--text f-text">By {{ author }}</span>
      </div>

      <span class="accent--text">{{ dateCreate(date) }}</span>
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
  data: () => ({}),
  methods: {
    photoUrl() {
      return 'https://github.com/' + this.author + '.png?size=32'
    },
    dateCreate(date) {
      return timeAgo(date)
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
