<template>
  <section class="user page-wrap">
    <v-container>
      <v-row>
        <div class="d-flex">
          <v-avatar size="160">
            <v-img class="user__avatar" :src="getAvatar(getUser && getUser.avatar)" />
          </v-avatar>
          <div class="user__title">
            <h1 class="user__name">{{ getUserFullName }}</h1>
            <p>Javascript</p>
          </div>
            
        </div>
      </v-row>

      <v-row class="justify-space-between mt-10">
        <v-col cols="12" md="5">
          <p>Hello!<br>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          <div class="user__media">
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
        <v-col class="user__statistic" cols="12" md="5">
          <h3>{{ $t("userInfo.statistic") }}</h3>
          <v-row>
            <v-col cols="12" class="user__statistic-block" md="6">
              <p>{{ $t("userInfo.rank") }}: <strong>73</strong></p>
              <p>{{ $t("userInfo.totalScore") }}: <strong>130656</strong></p>
              <p>{{ $t("userInfo.games") }}: <strong>45383</strong></p>
            </v-col>
            <v-col cols="12" md="6">
              <p>{{ $t("userInfo.bestGameScore") }}: <strong>15250</strong></p>
              <p>{{ $t("userInfo.maxAntInGame") }}: <strong>510</strong></p>
              <p>{{ $t("userInfo.wins") }}: <strong>120</strong></p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      
      <v-row class="justify-space-between mt-10">
        <v-col cols="12" md="5">
          <h3>{{ $t("userInfo.achivements") }}</h3>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          <div class="user__achivements">
            <UserAchivementChip
              v-for="(chip, index) in 10"
              :key="index + 'achivement'"
              title="Best bot 2020"
              description="Javascript beginner"
            />
          </div>
        </v-col>
        <v-col cols="12" md="5">
          <h3>{{ $t("userInfo.bestBots") }} ({{ getUserBots && getUserBots.length }})</h3>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          <v-row class="user__bots">
            <v-col
              cols="12" md="6"
              v-for="(bot, index) in getUserBots"
              :key="index + 'bot'"
            >
              <UserBotChip
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
import UserAchivementChip from '@/components/UserAchivementChip'
import UserBotChip from '@/components/UserBotChip'

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
    UserAchivementChip,
    UserBotChip
  },
  data: () => ({
    status: null,
    userInfo: {},
    user: {},
    us: null,
    filters: []
  }),
  created() {
    const name = this.$route.query.name || 'anthive'
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
      return this.userInfo && this.userInfo.user
    },
    getUserFullName() {
      return this.userInfo && this.userInfo.user && this.userInfo.user.fullName
    },
    getUserBots() {
      if (this.userInfo && this.userInfo.bots && this.userInfo.bots.length) {
        console.log(this.userInfo.bots, '🙈🙈🙈🙈🙈🙈🙈')
        return this.userInfo.bots
      }
    }
  },
  methods: {
    getAvatar(avatarId) {
      if (avatarId) {
        return this.us.photoUrl(avatarId, 150)
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
    max-height: 535px;
    overflow-y: scroll;
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

  &__bots {
  }
}
</style>
