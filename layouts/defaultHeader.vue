<template>
  <v-app-bar height="64" class="header" app fixed :clipped-left='$vuetify.breakpoint.lgAndUp'>
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
          v-show="getUser"
          label
          class="header__user-chip"
          color="accent"
          pill
          @click="handlerClickGetStarted"
        >
          <v-avatar tile :left="!$vuetify.breakpoint.mdAndDown">
            <v-img :src="(getUser) ? getUser.userAvatar : '/favicon-32x32.png'" />
          </v-avatar>
          {{ (getUser) ? getUser.userName : 'login' }}
        </v-chip>
        
        <AntHiveBtn v-show="(getUser==null)" @click="handlerClickGetStarted" color="accent" class="ml-3">{{
           $t("header.buttonJoin")
        }}</AntHiveBtn>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script>
import Logo from '@/components/logo'
import { mapGetters } from 'vuex'

export default {
  name: 'defaultHeader',
  components: {
    Logo
  },
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
  &__user-chip {
    margin-left: 10px;
  }
}
</style>
