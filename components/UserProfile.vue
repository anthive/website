<template>
  <section class="user page-wrap">
    <v-container>
      <v-row class="user-background">
        <div :style="`background: center/ cover no-repeat url(${getUserBackground})`" class="image" />
        <div class="gradient" />
      </v-row>
      <div class="mt-n3">
        <div class="d-flex">
          <v-avatar tile size="200">
            <v-img :src="getAvatar(getUser.avatar, 400)" class="avatar" />
          </v-avatar>
          <div class="title">
            <h1 class="user-name">{{ getUserFullName }}</h1>
          </div>
        </div>
      </div>
      <div class="justify-space-between mt-12">
        <p v-if="getUser.description">{{ getUser.description }}</p>
        <div v-if="getUserSocials" class="d-flex">
          <a
            v-for="(social, index) in getUserSocials"
            :key="index"
            :href="social.link"
            :title="social.name"
            class="social-link"
            rel="noreferrer"
            target="_blank"
          >
            <v-img :src="`/img/${social.name}.png`" />
          </a>
        </div>
      </div>

      <div v-if="getUserBots" class="bots-section">
        <h3>{{ $t("userInfo.bots") }}</h3>
        <div class="bots">
          <AntHiveBotVertical
            v-for="(bot, index) in getUserBots"
            :key="index + 'bot'"
            :bot="bot"
            :user="getUser"
          />
        </div>
      </div>
      <div v-if="games.length" class="games-section">
        <h3>{{ $t("userInfo.bestGames") }}</h3>
        <div class="games">
          <AntHiveGameVertical
            v-for="(game, index) in games"
            :key="index + 'game'"
            :game="game"
          />
        </div>
      </div>
    </v-container>
  </section>
</template>

<script>
import { User } from '@/services/User'
import AntHiveBotVertical from '@/components/AntHiveBotVertical'
import AntHiveGameVertical from '@/components/AntHiveGameVertical'
import Image from '@/mixins/image'
import { getUserGames } from '@/services/Game'

export default {
  name: 'UserProfile',
  components: {
    AntHiveGameVertical,
    AntHiveBotVertical
  },
  mixins: [Image],
  props: {
    username: {
      type: String,
      required: true
    }
  },
  head() {
    return {
      title: `AntHive.IO - ${this.getUserFullName}`,
      meta: [
        {
          name: 'description',
          content: this.$t('userInfo.meta.description')
        }
      ]
    }
  },
  data() {
    return {
      status: null,
      userInfo: {},
      user: {},
      us: null,
      games: []
    }
  },
  fetch() {
    if (process.server) {
      this.loadGames()
    }
  },
  computed: {
    getUserAvatar() {
      if (this.userInfo && this.userInfo.user) {
        return this.us.photoUrl(this.userInfo.user.avatar, 150)
      }
    },
    getUser() {
      if (this.userInfo) { return this.userInfo }
    },
    getUserFullName() {
      if (this.userInfo && this.userInfo.displayName) { return this.userInfo.displayName }
    },
    getUserBots() {
      if (this.userInfo && this.userInfo.bots && this.userInfo.bots.length) {
        return this.userInfo.bots
      }
    },
    getUserBackground() {
      if (this.userInfo && this.userInfo.background) {
        return this.userInfo.background
      }
      return '/img/user_background.png'
    },
    getUserSocials() {
      if (this.getUser && this.getUser.socials && this.getUser.socials.length) {
        return this.getUser.socials
      }
    }
  },
  mounted() {
    this.loadGames()
  },
  async created() {
    this.us = new User()
    const result = await this.us.getUserData(this.username)
    if (result) { this.userInfo = result }
  },
  methods: {
    loadGames() {
      getUserGames(this.username).then((games) => {
        if (games.length) {
          this.games = this.games.concat(games)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';

.user {
  overflow-x: hidden;
}

.user-name {
  padding: 100px 0 0 20px;
}

.bots-section,
.games-section {
  margin-top: 90px;

  .bots,
  .games {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -20px;
  }
}

.games {
  margin-top: 40px;
}

.user-background {
  position: absolute;
  top: 0;
  height: 225px;
  left: 0;
  right: 0;
}

.image {
  width: 100%;
}

.gradient {
  position: absolute;
  width: 100%;
  height: 100%;
  background: $user-background-gradient;
}

.avatar {
  background-color: $white;
  border: 7px solid $white;
}

.title {
  margin-left: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.social-media {
  display: flex;
}

.social-link {
  margin: 5px;
  width: 30px;
}
</style>
