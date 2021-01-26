<template>
  <section id="inspire" class="docs">
    <DocsSidebar />
    <div class="card">
      <div v-html="rules" />
    </div>
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
.rules {
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
}
.card {
  width: 100%;
  max-width: 1200px;
  margin: 20px auto;
  height: 100%;
  padding: 40px;
}
.rules .list-children {
  padding-left: 58px;
}
</style>
