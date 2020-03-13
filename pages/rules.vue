<template lang="pug">
  section#inspire.rules
    sidebar
    v-card.card
      rule-content
    
</template>

<script>
import sidebar from '@/components/rulesPage/sidebar'
import ruleContent from '@/pages/rules/_rule'

export default {
  components: {
    sidebar,
    ruleContent
  },
  data: () => ({})
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
  max-width: 800px;
  margin: 20px auto;
  height: 100%;
  padding: 40px;
}

.rules .list-children {
  padding-left: 58px;
}
</style>
