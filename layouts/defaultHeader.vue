<template>
  <v-app-bar class="header" app fixed :clipped-left='$vuetify.breakpoint.lgAndUp'>
    <v-container  class="d-flex align-center">
      <v-toolbar-title>
        <router-link :to="localePath('index')">
          <Logo />
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <v-menu class="hidden-md-and-up" offset-y transition="scale-transition">
        <template v-slot:activator="{ on }">
          <!-- TODO: open menu-->
          <v-btn rounded class="accent hidden-md-and-up" v-on="on"
            >menu
            <v-icon>mdi-chevron-right</v-icon> 
          </v-btn>
        </template>
        <v-list class="hidden-md-and-up pa-2">
          <v-list-item :to="localePath('games')">
            <v-list-item-icon>
              <v-icon>videogame_asset</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t("header.games") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="localePath('leaderboard')">
            <v-list-item-icon>
              <v-icon>poll</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t("header.leaderboard") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="localePath('rules')">
            <v-list-item-icon>
              <v-icon>import_contacts</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t("header.rules") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            class="green--text"
            href="https://profile.anthive.io/login"
          >
            <v-list-item-icon>
              <v-icon class="green--text">person</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ $t("header.login") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <div class="hidden-sm-and-down mr-6">
        <AntHiveBtn text color="primary" :to="localePath('games')">{{ $t("header.games") }}</AntHiveBtn>
        <AntHiveBtn text color="primary" :to="localePath('leaderboard')">{{
          $t("header.leaderboard")
        }}</AntHiveBtn>
        <AntHiveBtn text color="primary" :to="localePath('rules')">{{ $t("header.rules") }}</AntHiveBtn>
        <AntHiveBtn text color="primary" href="https://profile.anthive.io/login/">{{
          $t("header.login")
        }}</AntHiveBtn>
        <AntHiveBtn color="accent" class="ml-3" :to="localePath('sandbox')">{{
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

<style lang="scss" scoped>
@import '@/assets/style/global.scss';

.header {
  background: $color-white !important;
}
</style>
