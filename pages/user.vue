<template>
  <section class="user page-wrap">
    <v-container>
      <v-row>
        <div class="d-flex">
          <v-avatar size="160">
            <v-img class="user__avatar" :src="user.avatar" v-if="user.avatar" />
          </v-avatar>
          <div class="user__title">
            <h1 class="user__name">{{ user.fullName }}</h1>
            <p>Javascript</p>
          </div>
            
        </div>
      </v-row>

      <v-row class="justify-space-between mt-10">
        <v-col cols="12" md="5">
          <p>Hello!<br>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
          <div class="user__media">
            <a
              href="https://twitter.com/anthiveio"
              title="Our Twitter page"
              rel="noreferrer"
              target="_blank"
            >
              <AntHiveIcon color="white" class="footer__social--icon">twitter</AntHiveIcon>
            </a>
            <a
              href="https://www.instagram.com/anthiveio/"
              title="Our Instagram accoutn"
              rel="noreferrer"
              target="_blank"
            >
              <AntHiveIcon color="white" class="footer__social--icon">instagram</AntHiveIcon>
            </a>
            <a
              href="https://www.youtube.com/channel/UCP9SHUqnSdGEiEHbqIudMxw"
              title="Our Youtube channel"
              rel="noreferrer"
              target="_blank"
            >
              <AntHiveIcon color="white" class="footer__social--icon">youtube</AntHiveIcon>
            </a>
            <a
              href="https://www.twitch.tv/anthiveio"
              title="Our Twitch accoutn"
              rel="noreferrer"
              target="_blank"
            >
              <AntHiveIcon color="white" class="footer__social--icon">twitch</AntHiveIcon>
            </a>
            <a
              href="https://discord.gg/3Z7KvYv"
              title="Our Discord channel"
              rel="noreferrer"
              target="_blank"
            >
              <AntHiveIcon color="white" class="footer__social--icon">discord</AntHiveIcon>
            </a>
          </div>
        </v-col>
        <v-col class="user__statistic" cols="12" md="5">
          <h3>Statistic</h3>
          <v-row>
            <v-col cols="12" class="user__statistic-block" md="6">
              <p>Rank: <strong>73</strong></p>
              <p>Total score: <strong>130656</strong></p>
              <p>Games: <strong>45383</strong></p>
            </v-col>
            <v-col cols="12" md="6">
              <p>Best game score: <strong>15250</strong></p>
              <p>Max ants in game: <strong>510</strong></p>
              <p>Wins: <strong>120</strong></p>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
      
      <v-row class="justify-space-between mt-10">
        <v-col cols="12" md="5">
          <h3>Achivements</h3>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          <div class="user__achivements">
            <UserAchivementChip
              v-for="(chip, index) in 10"
              :key="index"
              title="Best bot 2020"
              description="Javascript beginner"
            />
          </div>
        </v-col>
        <v-col cols="12" md="5">
          <h3>Best bots (4)</h3>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
          <div class="user__achivements">
            
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
import { User } from '@/services/User'
import AntHiveIcon from '@/components/AntHiveIcon'
import UserAchivementChip from '@/components/UserAchivementChip'

export default {
  name: 'user',
  head() {
    return {
      title: `${this.user.fullName} - AntHive.IO`,
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
    UserAchivementChip
  },
  data: () => ({
    status: null,
    user: {},
    us: null,
    filters: []
  }),
  created() {
    const id = this.$route.query.id || 'anthive'
    this.us = new User()
    this.us.getUserData(id).then(result => {
      this.user = result
    })
    this.filters = { term: { 'Players.Username': this.user.username } }
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

  &__statistic {
    border-bottom: 0.5px solid $color-violet-400;
    padding-bottom: 0;
    margin-bottom: 25px;
  }

  &__statistic-block {
    border-right: 0.5px solid $color-violet-400;
  }

  &__achivements {
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
}
</style>
