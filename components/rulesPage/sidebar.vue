<template lang="pug">
  v-navigation-drawer(:clipped='$vuetify.breakpoint.lgAndUp' app)
    v-list(dense)
      template(v-for='(item, index) in items')
        v-list-group(v-if='item.children' :key='item.text')
          template(v-slot:activator)
            v-list-item-content
              v-list-item-title
                | {{ item.text }}
          v-list-item(v-for='(child, i) in item.children', :key='i', link :to="{ path: `/rules/${child.name}` }")
            v-list-item-content
              v-list-item-title.list-children
                | {{ child.text }}
        v-list-item(v-else :key='item.text' link)
          v-list-item-content
            v-list-item-title
              | {{ item.text }}
</template>

<script>
export default {
  data: () => ({
    items: [
      {
        text: 'Chapter 1',
        children: [
          { name: 'rule-1', text: 'Rule 1' },
          { name: 'rule-2', text: 'Rule 2' },
          { name: 'rule-3', text: 'Rule 3' }
        ]
      },
      {
        text: 'Chapter 2',
        children: [
          { name: 'rule-4', text: 'Rule 1' },
          { name: 'rule-5', text: 'Rule 2' },
          { name: 'rule-6', text: 'Rule 3' }
        ]
      },
      {
        text: 'Chapter 3',
        children: [
          { name: 'rule-7', text: 'Rule 1' },
          { name: 'rule-8', text: 'Rule 2' },
          { name: 'rule-9', text: 'Rule 3' }
        ]
      },
      {
        text: 'Chapter 4',
        children: [
          { name: 'rule-10', text: 'Rule 1' },
          { name: 'rule-11', text: 'Rule 2' },
          { name: 'rule-12', text: 'Rule 3' }
        ]
      }
    ]
  })
}
</script>

<style scoped>
.list-children {
  padding-left: 25px;
}
</style>
