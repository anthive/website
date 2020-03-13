<template lang="pug">
  v-container
    section
      p home / rules / {{ currentRule.chapter }} / {{ currentRule.title }}
      .display-1.mb-6 {{ currentRule.title }}
      p(v-html="currentRule.text")
</template>

<script>
export default {
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
.list-children {
  padding-left: 58px;
}
</style>
