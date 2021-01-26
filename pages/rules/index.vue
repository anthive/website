<template>
  <section id="inspire">
    <DocsSidebar />
    <div class="docs" v-html="rules" />
  </section>
</template>

<script>
import DocsSidebar from '@/components/DocsSidebar'

export default {
  head() {
    return {
      title: this.$t('rules.meta.title'),
      meta: [
        {
          name: 'description',
          content: this.$t('rules.meta.description')
        }
      ]
    }
  },
  components: {
    DocsSidebar
  },
  computed: {
    rules() {
      return require(`./rules_${this.$i18n.locale}.md`).default
    }
  }
}
</script>

<style scoped>
.docs {
  width: 100%;
  max-width: 1200px;
  margin: 20px auto;
  height: 100%;
  padding: 40px;
}
</style>
