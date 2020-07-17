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

export default {
  components: {
    defaultHeader,
    defaultFooter
  }
}
</script>
