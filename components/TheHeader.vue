<template>
  <v-app-bar
    :clipped-left="$vuetify.breakpoint.lgAndUp"
    :class="{ profile: isProfilePage }"
    class="header"
    height="80px"
    flat
    absolute
  >
    <v-container class="d-flex align-center pt-2">
      <v-toolbar-title @click="handlerClickMenuItem('index')">
        <TheLogo :light="isProfilePage" />
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
      <div class="hidden-sm-and-down">
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
import TheLogo from '@/components/TheLogo'

export default {
  name: 'TheHeader',
  components: {
    AntHiveIcon,
    TheLogo
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
    this.$gtag('event', `visitor_${eventCategory}`)
  },
  methods: {
    handlerClickGetStarted() {
      this.$gtag('event', 'header_get_started')
      window.location.href = this.profileUrl
    },
    handlerClickMenuItem(itemName) {
      this.$gtag('event', `to_${itemName}_page`)
      this.$router.push(this.localePath(itemName))
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/global.scss';

.header {
  background: $lilac-select !important;
  &.profile {
    background: transparent !important;
  }
  .logo {
    cursor: pointer;
    width: 144px;
    padding-top: 16px;
  }
  &.profile {
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
