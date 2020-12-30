<template>
  <div>
    <div class="avatar">
      <v-img :src="getAvatar(avatar, 100)" />
    </div>
  </div>
</template>

<script>
import Image from '@/mixins/image'
export default {
  name: 'AntHiveBotSmall',
  mixins: [Image],
  props: {
    avatar: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/style/global.scss';

.avatar {
  cursor: pointer;
  width: 32px;
  height: 32px;
  border: 2px solid $violet;
  box-sizing: content-box;
}
</style>
