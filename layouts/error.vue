<template>
  <div class="page-wrap">
    <div class="content">
      <v-img :src="`/img/404.png`" class="mx-auto mb-4" max-width="380px" />
      <h1 class="pl-6">{{ $t('error.title') }}</h1>
      <h4 class="pl-6">{{ $t('error.subtitle') }}</h4>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: this.$t('error.meta.title')
    }
  },
  mounted() {
    this.$gtag('event', '404_page')
  }
}
</script>
<style lang="scss" scoped>
.content {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
