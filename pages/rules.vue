<template lang="pug">
  section#inspire.rules
    sidebar
    v-card.card
      rule-content(:rule="currentRule")
    
</template>

<script>
import sidebar from '@/components/rulesPage/sidebar'
import ruleContent from '@/pages/rules/_rule'

export default {
  components: {
    sidebar,
    ruleContent
  },
  data: () => ({
    currentRule: null,
    rules: {
      'rule-1': {
        chapter: 'Chapter 1',
        title: 'Rule 1',
        text: '<kbd>Lorem ipsum dolor sit amet, consectetur</kbd>'
      },
      'rule-2': {
        chapter: 'Chapter 1',
        title: 'Rule 2',
        text: '<code>&lt;Lorem ipsum dolor sit amet, consectetur&gt;</code>'
      },
      'rule-3': { chapter: 'Chapter 1', title: 'Rule 3', text: 'Lorem ipsum dolor sit amet, consectetur ' },
      'rule-4': { chapter: 'Chapter 2', title: 'Rule 4', text: 'Lorem ipsum dolor sit amet, consectetur' },
      'rule-5': { chapter: 'Chapter 2', title: 'Rule 5', text: 'Lorem ipsum dolor sit amet, consectetur ' },
      'rule-6': { chapter: 'Chapter 2', title: 'Rule 6', text: 'Lorem ipsum dolor sit amet, consectetur ' },
      'rule-7': { chapter: 'Chapter 3', title: 'Rule 7', text: 'Lorem ipsum dolor sit amet, consectetur ' },
      'rule-8': { chapter: 'Chapter 3', title: 'Rule 8', text: 'Lorem ipsum dolor sit amet, consectetur ' },
      'rule-9': { chapter: 'Chapter 3', title: 'Rule 9', text: 'Lorem ipsum dolor sit amet, consectetur ' },
      'rule-10': { chapter: 'Chapter 4', title: 'Rule 10', text: 'Lorem ipsum dolor sit amet, consectetur ' },
      'rule-11': { chapter: 'Chapter 4', title: 'Rule 11', text: 'Lorem ipsum dolor sit amet, consectetur ' },
      'rule-12': { chapter: 'Chapter 4', title: 'Rule 12', text: 'Lorem ipsum dolor sit amet, consectetur ' }
    }
  }),
  created() {
    this.currentRule = this.rules['rule-1']
  },
  computed: {
    ruleName() {
      return this.$route.params.rule
    }
  },
  watch: {
    ruleName() {
      this.currentRule = this.rules[this.ruleName]
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
