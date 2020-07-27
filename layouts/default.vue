<template>
  <v-app id="inspire">
    <defaultHeader />
    <v-main>
      <nuxt />
    </v-main>
    <defaultFooter />
  </v-app>
</template>

<script>
import defaultHeader from '@/layouts/defaultHeader'
import defaultFooter from '@/layouts/defaultFooter'
import { mapMutations } from 'vuex'

export default {
  components: {
    defaultHeader,
    defaultFooter
  },
  methods: {
    ...mapMutations(['setUserAuthStatus'])
  },
  created() {
    if (process.client) {
      const isUserLogged = ('; ' + document.cookie)
        .split('; auth=')
        .pop()
        .split(';')
        .shift()
      this.setUserAuthStatus(!!isUserLogged)
    }
  }
}
</script>
