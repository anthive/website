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
import { ImageActions } from '@/services/Image'

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
      userAvatar: ImageActions.getImageById(this.$cookiz.get('userAvatar'), 32)
    }
    this.setUser(user)
  }
}
</script>
