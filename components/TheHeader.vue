<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    class="header"
    height="80px"
    flat
    absolute
  >
    <v-container class="d-flex align-center pt-2">
      <v-toolbar-title>
        <img
          :src="getLogo"
          class="logo"
          alt="Logo"
          width="145px"
          height="165px"
          @click="handlerClickMenuItem('index')"
        >
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
          <v-list-item @click="handlerClickMenuItem('games')">
            <v-list-item-content>
              <v-list-item-title>{{ $t("header.games") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="handlerClickMenuItem('leaderboard')">
            <v-list-item-content>
              <v-list-item-title>
                {{ $t("header.leaderboard") }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="handlerClickMenuItem('rules')">
            <v-list-item-content>
              <v-list-item-title>{{ $t("header.rules") }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item @click="handlerClickMenuItem('sandbox')">
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
      <div :class="{ profile: isProfilePage }" class="hidden-sm-and-down">
        <span class="link" @click="handlerClickMenuItem('games')">
          {{ $t("header.games") }}
        </span>
        <span class="link" @click="handlerClickMenuItem('leaderboard')">
          {{ $t("header.leaderboard") }}
        </span>
        <span class="link" @click="handlerClickMenuItem('rules')">
          {{ $t("header.rules") }}
        </span>
        <span class="link" @click="handlerClickMenuItem('sandbox')">
          {{ $t("header.sandbox") }}
        </span>

        <v-chip
          v-show="getUser"
          tile
          label
          class="user-chip"
          color="primary"
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
  data() {
    return {
      profileUrl: process.env.PROFILE_URL
    }
  },
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
  mounted() {
    const eventCategory = this.getUser ? 'logened_user' : 'not_logened_user'
    this.$gtag('event', 'Home page visit', { event_category: eventCategory, event_label: 'homepage' })
  },
  methods: {
    handlerClickGetStarted() {
      this.$gtag('event', 'Get started Header', { event_category: 'get_started', event_label: 'header' })
      window.location.href = this.profileUrl
    },
    handlerClickMenuItem(itemName) {
      this.$gtag('event', `Go to ${itemName} page`, { event_category: itemName, event_label: 'header' })
      this.$router.push(this.localePath(itemName))
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/global.scss';

.header {
  background: $lilac-select !important;

  .logo {
    cursor: pointer;
    width: 144px;
    padding-top: 16px;
  }
  .profile {
    .link {
      color: $white;
    }
  }
  .link {
    padding: 10px;
    margin: 0 15px;
    font-weight: $font-weight-bold;
    cursor: pointer;
    color: $violet;

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
