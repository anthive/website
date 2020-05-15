<template>
  <v-app-bar app fixed>
    <v-container class="d-flex align-center">
      <v-toolbar-title>
        <router-link :to="localePath('index')">
          <Logo></Logo>
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu class="hidden-md-and-up" offset-y transition="scale-transition">
        <template v-slot:activator="{ on }">
          <!-- TODO: open menu-->
          <AntHiveBtn class="hidden-md-and-up" v-on="on"
            >menu
            <v-icon>keyboard_arrow_right</v-icon>
          </AntHiveBtn>
        </template>
        <v-list class="hidden-md-and-up pa-2">
          <v-list-item :to="localePath('games')">
            <v-list-item-icon>
              <v-icon>videogame_asset</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t("games") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="localePath('leaderboard')">
            <v-list-item-icon>
              <v-icon>poll</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t("leaderboard") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="localePath('rules')">
            <v-list-item-icon>
              <v-icon>import_contacts</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t("rules") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            class="green--text"
            href="https://profile.anthive.io/login/"
          >
            <v-list-item-icon>
              <v-icon class="green--text">person</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t("login") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <div class="hidden-sm-and-down mr-6">
        <AntHiveBtn primary :to="localePath('games')">{{ $t("games") }}</AntHiveBtn>
        <AntHiveBtn primary :to="localePath('leaderboard')">{{
          $t("leaderboard")
        }}</AntHiveBtn>
        <AntHiveBtn primary :to="localePath('rules')">{{ $t("rules") }}</AntHiveBtn>
        <AntHiveBtn primary href="https://profile.anthive.io/login/">{{
          $t("login")
        }}</AntHiveBtn>
        <AntHiveBtn primary class="ml-3" :to="switchLocalePath('en')">{{
          $t("en")
        }}</AntHiveBtn>
        <AntHiveBtn primary class="ml-3" :to="switchLocalePath('ru')">{{
          $t("ru")
        }}</AntHiveBtn>
        <AntHiveBtn class="ml-3" :to="localePath('sandbox')" fill>{{
          "sandbox"
        }}</AntHiveBtn>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script>
import Logo from '@/components/logo'

export default {
  name: 'defaultHeader',
  data: () => ({}),
  mounted() {},
  components: {
    Logo
  }
}
</script>

<style>
a {
  text-decoration: none;
}
</style>
