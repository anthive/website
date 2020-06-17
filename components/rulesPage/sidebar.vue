<template>
  <v-navigation-drawer :clipped='$vuetify.breakpoint.lgAndUp' app>
    <v-list dense>

      <template v-for='chapter in getRules'>
        <v-list-group :key='chapter.chapterName'>
          
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title>
                {{ chapter.chapterName }}
              </v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item
            v-for='rule in chapter.rules'
            :key='rule.id'
            link
            @click="setCurrentRule(rule)"
            :to="{ path: `/rules/${rule.id}` }"
          >
            <v-list-item-content>
              <v-list-item-title class="list-children">
                {{ rule.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

        </v-list-group>

      </template>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getRules'])
  },
  methods: {
    ...mapActions(['setCurrentRule'])
  }
}
</script>

<style scoped>
.list-children {
  padding-left: 25px;
}
</style>
