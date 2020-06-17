<template>
  <section id="inspire" class="rules">
    <sidebar />
    <v-card class="card">
      <rule-content :rule="getCurrentRule" />
    </v-card>
  </section>
</template>

<script>
import sidebar from '@/components/rulesPage/sidebar'
import ruleContent from '@/pages/rules/_rule'
import { mapGetters } from 'vuex'

export default {
  components: {
    sidebar,
    ruleContent
  },
  computed: {
    ...mapGetters(['getRules', 'getCurrentRule'])
  }
}
</script>

<style scoped>
.rules {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}
.card {
  width: 100%;
  max-width: 950px;
  margin: 20px auto;
  height: 100%;
  padding: 40px;
}
.rules .list-children {
  padding-left: 58px;
}
</style>
