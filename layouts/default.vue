<template lang="pug">
    v-app(id="inspire")
      defaultHeader
      v-content
        nuxt
      defaultFooter
</template>

<script>
import defaultHeader from '@/layouts/defaultHeader'
import defaultFooter from '@/layouts/defaultFooter'
import { mapActions } from 'vuex'

export default {
  components: {
    defaultHeader,
    defaultFooter
  },
  data() {
    return {}
  },
  methods: {
    ...mapActions(['setCurrentLocale'])
  },
  computed: {
    locale() {
      return this.$i18n.locale
    }
  },
  watch: {
    locale() {
      this.setCurrentLocale(this.locale)
    }
  }
}
</script>

<style>
</style>
