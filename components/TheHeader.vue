<template>
  <v-app-bar height="64" class="header" app fixed :clipped-left='$vuetify.breakpoint.lgAndUp'>
    <v-container  class="d-flex align-center">
      <v-toolbar-title>
        <router-link :to="localePath('index')">
          <img class="header__logo" src="/img/anthive_logo.svg" alt="Logo" />
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <v-menu class="hidden-md-and-up" offset-y transition="scale-transition">
        <template v-slot:activator="{ on }">
          <!-- TODO: open menu-->
          <v-btn class="accent hidden-md-and-up" v-on="on"
            >{{ $t("header.menu") }}
          </v-btn>
        </template>
        <v-list class="hidden-md-and-up pa-2">
          <v-list-item :to="localePath('games')">
            <v-list-item-content>
              <v-list-item-title>{{ $t("header.games") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="localePath('leaderboard')">
            <v-list-item-content>
              <v-list-item-title>{{ $t("header.leaderboard") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="localePath('rules')">
            <v-list-item-content>
              <v-list-item-title>{{ $t("header.rules") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item href="https://profile.anthive.io/login">
            <v-list-item-content>
              <v-list-item-title>{{ $t("header.buttonJoin") }}</v-list-item-title>
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

        <v-chip
          v-if="getUser"
          label
          class="header__user-chip"
          color="accent"
          pill
          @click="handlerClickGetStarted"
        >
          <v-avatar tile :left="!$vuetify.breakpoint.mdAndDown">
            <v-img :src="getUser.userAvatar" />
          </v-avatar>
          {{ getUser.userName }}
        </v-chip>
        
        <AntHiveBtn v-else @click="handlerClickGetStarted" color="accent" class="ml-3">{{
           $t("header.buttonJoin")
        }}</AntHiveBtn>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TheHeader',
  computed: {
    ...mapGetters(['getUser'])
  },
  methods: {
    handlerClickGetStarted() {
      this.$ga.event({ eventCategory: 'getstarted', eventAction: 'redirect' })
      window.location.href = 'https://profile.anthive.io/'
    }
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
  &__logo {
    width: 115px;
  }
  &__user-chip {
    margin-left: 10px;
  }
}
</style>
