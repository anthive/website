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
    ...mapMutations(['setUser'])
  },
  created() {
    const user = {
      userName: this.$cookiz.get('userName'),
      userAvatar: this.$cookiz.get('userAvatar')
    }
    this.setUser(user)
  }
}
</script>
