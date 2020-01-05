<template  lang="pug">
  v-footer.pa-4.elevation-2(app tag="footer" absolute)
    strong AntHive.IO
    span.mx-2 Copyright&copy;, {{ new Date().getFullYear() }}
    a(href="https://github.com/anthive/io/issues") {{ $t('issueOnGithub')}}
</template>

<script>
export default {
  name: 'defaultFooter',
  data: () => ({
  }),
  mounted() {
  },
  components: {
  }
}
</script>

<style>
</style>
