<template>
  <v-container>
    <section>
      <v-breadcrumbs class="pa-0 mb-5" :items="items">
        <template v-slot:divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>
      <div class="display-1 mb-6">{{ rule.title }}</div>
      <p v-html="rule.text" />
    </section>
  </v-container>
</template>

<script>
export default {
  data: () => ({}),
  props: {
    rule: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    items() {
      return [
        {
          text: 'Home',
          disabled: false,
          href: '/'
        },
        {
          text: 'Rules',
          disabled: false,
          href: '/rules'
        },
        {
          text: this.rule.chapter,
          disabled: true,
          href: ''
        },
        {
          text: this.rule.title,
          disabled: true,
          href: ''
        }
      ]
    }
  }
}
</script>

<style scoped>
.list-children {
  padding-left: 58px;
}
</style>
