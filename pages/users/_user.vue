<template>
  <!-- TODO: use real user datas -->
  <section class="user page-wrap">
    <v-container>
      <v-row>
        <div class="d-flex">
          <v-avatar tile size="160">
            <v-img class="user__avatar" :src="getAvatar(getUser.avatar, 100)" />
          </v-avatar>
          <div class="user__title">
            <h1 class="user__name">{{ getUserFullName }}</h1>
          </div>
            
        </div>
      </v-row>

      <v-row class="justify-space-between mt-10">
        <v-col cols="12" md="12">
          <p v-if="getUser.description">Hello!<br>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          <div v-if="getUser.socials" class="user__media">
            <a
              class="user__social-link"
              href="#"
              title="brandfolder"
              rel="noreferrer"
              target="_blank"
            >
              <v-img src="/img/brandfolder.png" />
            </a>
            <a
              class="user__social-link"
              href="#"
              title="facebook"
              rel="noreferrer"
              target="_blank"
            >
              <v-img src="/img/facebook.png" />
            </a>
            <a
              class="user__social-link"
              href="#"
              title="linkedIn"
              rel="noreferrer"
              target="_blank"
            >
              <v-img src="/img/linkedIn.png" />
            </a>
            <a
              class="user__social-link"
              href="#"
              title="twitter"
              rel="noreferrer"
              target="_blank"
            >
              <v-img src="/img/twitter.png" />
            </a>
            <a
              class="user__social-link"
              href="#"
              title="youtube"
              rel="noreferrer"
              target="_blank"
            >
              <v-img src="/img/youtube.png" />
            </a>
          </div>
        </v-col>
      </v-row>
      
      <v-row class="justify-space-between mt-10">
        <v-col cols="12" md="12">
          <h3>{{ $t("userInfo.bots") }}</h3>
          <v-row class="user__bots">
            <v-col
              cols="12" md="2"
              v-for="(bot, index) in getUserBots"
              :key="index + 'bot'"
            >
              <AntHiveBotVertical
                :lang="bot.lang"
                :name="bot.displayName"
                :avatar="getAvatar(bot.avatar)"
                games="1234514"
                wins="2331"
              />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { User } from '@/services/User'
import AntHiveIcon from '@/components/AntHiveIcon'
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
    AntHiveIcon,
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
    // this.filters = { term: { 'Players.Username': this.userInfo.user.username } }
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
      if (this.userInfo && this.userInfo.fullName) return this.userInfo.fullName
    },
    getUserBots() {
      if (this.userInfo && this.userInfo.bots && this.userInfo.bots.length) {
        return this.userInfo.bots
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';
.user {
  background-color: $color-violet-50;
  overflow-x: hidden;

  &__avatar {
    border: 10px solid $color-white;
  }

  &__title {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  &__media {
    display: flex;
  }

  &__social-link {
    margin: 5px;
    width: 25px;
  }

  &__statistic {
    border-bottom: 0.5px solid $color-violet-400;
    padding-bottom: 0;
    margin-bottom: 25px;
  }

  &__statistic-block {
    border-right: 0.5px solid $color-violet-400;
  }

  &__achivements,
  &__bots {
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-track {
      background: $color-violet-400;
    }
    &::-webkit-scrollbar-thumb {
      background: $color-violet-600;
    }
  }
}
</style>
