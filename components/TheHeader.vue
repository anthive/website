<template>
  <v-app-bar
    height="82"
    class="header"
    app
    fixed
    :clipped-left="$vuetify.breakpoint.lgAndUp"
  >
    <v-container class="d-flex align-center">
      <v-toolbar-title>
        <router-link :to="localePath('index')">
          <img class="header__logo" src="/img/anthive_logo.svg" alt="Logo" />
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <v-menu class="hidden-md-and-up" offset-y transition="scale-transition">
        <template v-slot:activator="{ on }">
          <!-- TODO: open menu-->
          <v-btn tile class="accent hidden-md-and-up" v-on="on"
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
              <v-list-item-title>{{
                $t("header.leaderboard")
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="localePath('rules')">
            <v-list-item-content>
              <v-list-item-title>{{ $t("header.rules") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :to="localePath('sandbox')">
            <v-list-item-content>
              <v-list-item-title>{{ $t("header.sandbox") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item :href="profileURL">
            <v-list-item-content>
              <v-list-item-title>{{
                $t("header.buttonJoin")
              }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <div class="hidden-sm-and-down mr-6">
        <AntHiveBtn tile text :to="localePath('games')">{{
          $t("header.games")
        }}</AntHiveBtn>
        <AntHiveBtn tile text :to="localePath('leaderboard')">{{
          $t("header.leaderboard")
        }}</AntHiveBtn>
        <AntHiveBtn tile text :to="localePath('rules')">{{
          $t("header.rules")
        }}</AntHiveBtn>
        <AntHiveBtn tile text :to="localePath('sandbox')">{{
          $t("header.sandbox")
        }}</AntHiveBtn>

        <v-chip
          v-show="getUser"
          tile
          label
          class="header__user-chip"
          color="accent"
          pill
          @click="handlerClickGetStarted"
        >
          <v-avatar tile left>
            <v-img :src="getUserAvatar" />
          </v-avatar>
          {{ getUserName }}
        </v-chip>

        <AntHiveBtn
          tile
          v-show="!getUser"
          @click="handlerClickGetStarted"
          color="accent"
          class="ml-3"
          >{{ $t("header.buttonJoin") }}</AntHiveBtn
        >
      </div>
    </v-container>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'TheHeader',
  data: () => ({
    profileURL: process.env.PROFILE_URL
  }),
  computed: {
    ...mapGetters(['getUser']),
    getUserAvatar() {
      return this.getUser && this.getUser.userAvatar ? this.getUser.userAvatar : '/img/default-user-avatar.png'
    },
    getUserName() {
      return this.getUser && this.getUser.userName ? this.getUser.userName : 'anthive'
    }
  },
  methods: {
    handlerClickGetStarted() {
      this.$ga.event({ eventCategory: 'getstarted', eventAction: 'redirect', eventLabel: 'header' })
      window.location.href = this.profileURL
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
  background: $color-violet-700 !important;
  color: $color-white;
  position: relative;
  &__logo {
    width: 198px;
    position: absolute;
    bottom: 0;
  }
  &__user-chip {
    margin-left: 10px;
  }
}
</style>
