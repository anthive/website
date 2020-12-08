<template>
  <v-app-bar
    class="header"
    flat
    absolute
    :clipped-left="$vuetify.breakpoint.lgAndUp"
  >
    <v-container class="d-flex align-center pt-8">
      <v-toolbar-title>
        <router-link :to="localePath('index')">
          <img class="header__logo" src="/img/anthive_logo_dark.svg" alt="Logo" />
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <v-menu class="hidden-md-and-up" offset-y transition="scale-transition">
        <template v-slot:activator="{ on }">
          <!-- TODO: open menu-->
          <v-btn tile class="accent hidden-md-and-up" v-on="on">
            <AntHiveIcon color="white">menu</AntHiveIcon>
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
              <v-list-item-title>
                {{ $t("header.leaderboard") }}
              </v-list-item-title>
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
          <v-list-item :href="profileUrl">
            <v-list-item-content>
              <v-list-item-title>
                {{ $t("header.buttonJoin") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <div class="hidden-sm-and-down mr-6">
        <nuxt-link class="header__link" :to="localePath('games')">
          {{ $t("header.games") }}
        </nuxt-link>
        <nuxt-link class="header__link" :to="localePath('leaderboard')">
          {{ $t("header.leaderboard") }}
        </nuxt-link>
        <nuxt-link class="header__link" :to="localePath('rules')">
          {{ $t("header.rules") }}
        </nuxt-link>
        <nuxt-link class="header__link" :to="localePath('sandbox')">
          {{ $t("header.sandbox") }}
        </nuxt-link>

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

        <AntHiveButton
          tile
          v-show="!getUser"
          @click="handlerClickGetStarted"
          color="accent"
          class="ml-3"
        >
          {{ $t("header.buttonJoin") }}
        </AntHiveButton>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script>
import AntHiveIcon from '@/components/AntHiveIcon'
import { mapGetters } from 'vuex'

export default {
  name: 'TheHeader',
  components: {
    AntHiveIcon
  },
  data: () => ({
    profileUrl: process.env.PROFILE_URL
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
      this.$gtag('event', 'redirect', { event_category: 'getstarted', event_label: 'header' })
      window.location.href = this.profileUrl
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';

.header {
  background: transparent !important;
  position: relative;

  &__logo {
    width: 144px;
    padding-top: 16px;
  }

  &__link {
    padding: 10px;
    margin: 0 15px;
    font-weight: 500;

    &:hover {
      text-decoration: none !important;
      border-bottom: 2px solid;
    }

    &.nuxt-link-active {
      border-bottom: 2px solid;
    }
  }

  &__user-chip {
    margin-left: 10px;
    border-radius: $border-radius-tile !important;
  }
}
</style>
