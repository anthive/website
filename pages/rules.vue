<template>
  <section id="inspire" class="rules">
    <sidebar />
    <v-card class="card">
      <rule-content :rule="currentRule" />
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
    ...mapGetters(['getRules']),
    ruleId() {
      return this.$route.params.rule
    },
    currentRule() {
      if (!this.ruleId) return this.getRules[0].rules[0]
      let rule
      this.getRules.some(chapter => {
        rule = chapter.rules.find(rule => rule.id === this.ruleId)
        return rule
      })
      return rule
    }
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
