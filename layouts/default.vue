<template>
  <v-app id="inspire">
    <TheHeader />
    <v-main class="overflow-hidden">
      <nuxt />
    </v-main>
    <TheFooter />
  </v-app>
</template>

<script>
import { mapMutations } from 'vuex'
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'
import { getImageById } from '@/services/Image'

export default {
  components: {
    TheHeader,
    TheFooter
  },
  created() {
    const user = {
      userName: this.$cookiz.get('userName'),
      userAvatar: getImageById(this.$cookiz.get('userAvatar'), 32)
    }
    this.setUser(user)
  },
  methods: {
    ...mapMutations(['setUser'])
  }
}
</script>

<style lang="scss">
@import '@/assets/style/global.scss';
#inspire {
  background-color: $lilac-select;
}
</style>
