<template>
  <v-app id="inspire">
    <TheHeader />
    <v-main>
      <nuxt />
    </v-main>
    <TheFooter />
  </v-app>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'
import { mapMutations } from 'vuex'

export default {
  components: {
    TheHeader,
    TheFooter
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
