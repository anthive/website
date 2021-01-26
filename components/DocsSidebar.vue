<template>
  <v-navigation-drawer
    fixed
    app
    class="sidebar"
    width="200"
    color="transparent"
  >
    <v-list dense>
      <template v-for="chapter in docs">
        <v-list-item-content :key="chapter.name" class="pa-0">
          <v-list-item
            :to="{ path: `#${chapter.name}` }"
            class="py-0"
            link
          >
            {{ chapter.name }}
          </v-list-item>
        </v-list-item-content>
        <template v-if="chapter.rules">
          <v-list-item
            v-for="rule in chapter.rules"
            :key="rule"
            :to="{ path: `#${rule}` }"
            link
          >
            <v-list-item-content>
              <v-list-item-title class="children">
                {{ rule }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'DocsSidebar',
  data: () => ({
    docs: [
      {
        name: 'introduction',
        rules: ['beginners', 'professionals', 'scientist']
      },
      {
        name: 'terminology',
        rules: ['sim', 'bot', 'map', 'cell', 'ant', 'order']
      },
      {
        name: 'rules',
        rules: ['score']
      },
      { name: 'errors' },
      { name: 'faq' }
    ]
  })
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';

.sidebar {
  z-index: 0;
  padding-top: 70px;
  max-height: 100% !important;
  text-transform: capitalize;
  a {
    text-decoration: none !important;
  }
  // chapter color
  ::v-deep .theme--light.v-list-item {
    color: $violet !important;
  }
}
.children {
  padding-left: 25px;
  color: $violet;
}
</style>
