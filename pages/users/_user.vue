<template>
  <section class="user page-wrap">
    <v-container>
      <v-row class="user-background">
        <div class="image" :style="`background: center/ cover no-repeat url(${getUserBackground})`" />
        <div class="gradient" />
      </v-row>
      <div class="mt-n3">
        <div class="d-flex">
          <v-avatar tile size="200">
            <v-img class="avatar" :src="getAvatar(getUser.avatar, 400)" />
          </v-avatar>
          <div class="title">
            <h1 class="user-name">{{ getUserFullName }}</h1>
          </div>
        </div>
      </div>
      <div class="justify-space-between mt-12">
        <p v-if="getUser.description">{{ getUser.description}}</p>
        <!-- TODO: remove -->
        <p>Hello!<br>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
        <!-- TODO: add condition -->
        <div class="d-flex">
          <a
            v-for="(social, index) in getUser.socials"
            :key="index"
            class="social-link"
            :href="social.link"
            :title="social.name"
            rel="noreferrer"
            target="_blank"
          >
            <v-img :src="`/img/${social.name}.png`" />
          </a>
          <!-- TODO: remove -->
          <a
            class="social-link"
            href="#"
            title="brandfolder"
            rel="noreferrer"
            target="_blank"
          >
            <v-img src="/img/brandfolder.png" />
          </a>
        </div>
      </div>
      
      <div class="bots" v-if="getUserBots">
        <h3 class="mb-2">{{ $t("userInfo.bots") }}</h3>
        <v-row>
          <v-col
            cols="12" md="2"
            v-for="(bot, index) in getUserBots"
            :key="index + 'bot'"
          >
            <AntHiveBotVertical :bot="bot" />
          </v-col>
        </v-row>
      </div>
      <div class="games" v-if="getUserGames">
        <h3 class="mb-2">{{ $t("userInfo.bestGames") }}</h3>
        <v-row>
          <v-col
            cols="12" md="2"
            v-for="(game, index) in getUserGames"
            :key="index + 'game'"
          >
          <!-- TODO: game chip -->
            <!-- <AntHiveBotVertical
              :lang="bot.lang"
              :name="bot.displayName"
              :avatar="getAvatar(bot.avatar)"
              games="1234514"
              wins="2331"
            /> -->
          </v-col>
        </v-row>
      </div>
    </v-container>
  </section>
</template>

<script>
import { User } from '@/services/User'
import AntHiveAchivement from '@/components/AntHiveAchivement'
import AntHiveBotVertical from '@/components/AntHiveBotVertical'
import Image from '@/mixins/image'

export default {
  name: 'user',
  head() {
    return {
      title: `${this.getUserFullName} - AntHive.IO`,
      meta: [
        {
          name: 'description',
          content: this.$t('userInfo.meta.description')
        }
      ]
    }
  },
  components: {
    AntHiveAchivement,
    AntHiveBotVertical
  },
  mixins: [Image],
  data: () => ({
    status: null,
    userInfo: {},
    user: {},
    us: null,
    filters: []
  }),
  created() {
    const name = this.$route.params.user || 'anthive'
    this.us = new User()
    this.us.getUserData(name).then(result => {
      this.userInfo = result
    })
  },
  computed: {
    getUserAvatar() {
      if (this.userInfo && this.userInfo.user) {
        return this.us.photoUrl(this.userInfo.user.avatar, 150)
      }
    },
    getUser() {
      if (this.userInfo) return this.userInfo
    },
    getUserFullName() {
      console.log(this.userInfo)
      if (this.userInfo && this.userInfo.fullName) return this.userInfo.fullName
    },
    getUserBots() {
      if (this.userInfo && this.userInfo.bots && this.userInfo.bots.length) {
        return this.userInfo.bots
      }
    },
    getUserGames() {
      if (this.userInfo && this.userInfo.games && this.userInfo.games) {
        return this.userInfo.games
      }
    },
    getUserBackground() {
      if (this.userInfo && this.userInfo.background) {
        return this.userInfo.background
      }
      return '/img/user_background.png'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';

.user {
  background-color: $color-violet-50;
  overflow-x: hidden;
}

.user-name {
  padding: 100px 0 0 20px;
}

.bots {
  margin-top: 90px;
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
  background-color: $color-white;
  border: 7px solid $color-white;
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
