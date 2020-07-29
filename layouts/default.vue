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
import Cookie from '@/services/Cookie'

export default {
  components: {
    defaultHeader,
    defaultFooter
  },
  methods: {
    ...mapMutations(['setUser'])
  },
  created() {
    if (process.client) {
      const user = {
        userName: Cookie.get('userName'),
        userAvatar: Cookie.get('userAvatar')
      }
      this.setUser(user)
    }
  }
}
</script>
