<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    class="header"
    flat
    absolute
  >
    <v-container class="d-flex align-center pt-8">
      <v-toolbar-title>
        <router-link :to="localePath('index')">
          <img :src="getLogo" class="logo" alt="Logo" >
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <v-menu class="hidden-md-and-up" offset-y transition="scale-transition">
        <template v-slot:activator="{ on }">
          <!-- TODO: open menu-->
          <v-btn tile class="accent hidden-md-and-up" v-on="on">
            <AntHiveIcon icon="menu" color="white" />
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
      <div :class="{ profile: isProfilePage }" class="hidden-sm-and-down mr-6">
        <nuxt-link :to="localePath('games')" class="link">
          {{ $t("header.games") }}
        </nuxt-link>
        <nuxt-link :to="localePath('leaderboard')" class="link">
          {{ $t("header.leaderboard") }}
        </nuxt-link>
        <nuxt-link :to="localePath('rules')" class="link">
          {{ $t("header.rules") }}
        </nuxt-link>
        <nuxt-link :to="`${localePath('sandbox')}/js`" class="link">
          {{ $t("header.sandbox") }}
        </nuxt-link>

        <v-chip
          v-show="getUser"
          tile
          label
          class="user-chip"
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
          v-show="!getUser"
          tile
          color="primary"
          class="ml-3"
          @click="handlerClickGetStarted"
        >
          {{ $t("header.buttonJoin") }}
        </AntHiveButton>
      </div>
    </v-container>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'
import AntHiveIcon from '@/components/AntHiveIcon'

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
    },
    isProfilePage() {
      return this.$route.path.startsWith('/users/')
    },
    getLogo() {
      return this.isProfilePage ? '/img/anthive_logo.svg' : '/img/anthive_logo_dark.svg'
    }
  },
  methods: {
    handlerClickGetStarted() {
      this.$gtag('event', 'Get started Header', { event_category: 'getstarted', event_label: 'header' })
      window.location.href = this.profileUrl
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';

.header {
  background: transparent !important;

  .logo {
    width: 144px;
    padding-top: 16px;
  }
  .profile {
    .link {
      color: $color-white;
    }
  }
  .link {
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

  .user-chip {
    margin-left: 10px;
    border-radius: $border-radius-tile !important;
  }
}
</style>
