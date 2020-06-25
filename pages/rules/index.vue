<template>
  <section id="inspire" class="docs">
    <v-card class="card">
      <div v-html="rules" />
    </v-card>
  </section>
</template>

<script>
import sidebar from '@/components/docsPage/sidebar'

export default {
  components: {
    sidebar
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
  max-width: 950px;
  margin: 20px auto;
  height: 100%;
  padding: 40px;
}
.rules .list-children {
  padding-left: 58px;
}
</style>
