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
  name: 'AntHiveAuthor',
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
