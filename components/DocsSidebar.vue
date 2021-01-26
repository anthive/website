<template>
  <v-navigation-drawer
    fixed
    app
    class="sidebar"
    width="200"
  >
    <v-list dense>
      <template v-for="chapter in docs">
        <v-list-group :key="chapter.name">
          <template v-slot:activator >
            <v-list-item-content>
              <v-list-item
                :to="{ path: `#${chapter.name}` }"
                link
              >
                {{ chapter.name }}
              </v-list-item>
            </v-list-item-content>
          </template>
          <template v-if="chapter.rules">
            <v-list-item
              v-for="rule in chapter.rules"
              :key="rule"
              :to="{ path: `#${rule}` }"
              link
            >
              <v-list-item-content>
                <v-list-item-title class="list-children">
                  {{ rule }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-group>
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
<style lang="scss">
@import '@/assets/style/global.scss';

.sidebar {
  .v-list-group__header,
  .v-list-item__content {
    padding: 0 !important;
    width: 100% !important;
  }
  .v-list-item__icon {
    display: none;
  }
  .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
    color: $violet !important;
  }
}
</style>
<style lang="scss" scoped>
.sidebar {
  z-index: 0;
  padding-top: 80px;
  max-height: 100% !important;
  text-transform: capitalize;
}
.list-children {
  padding-left: 25px;
}
</style>
