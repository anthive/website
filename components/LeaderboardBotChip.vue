<template>
  <v-row class="leader-card">
    <v-col
      cols="12"
      sm="1"
      class="text-center">
      <!-- TOP 3 -->
      <span v-if="place === 1" class="place">{{ place }}</span>
      <span v-else-if="place === 2" class="place">{{ place }}</span>
      <span v-else-if="place === 3" class="place">{{ place }}</span>

      <span v-else class="place">{{ place }}</span>
    </v-col>

    <v-col cols="12" sm="11" class="py-0">
      <v-card tile>
        <div class="d-flex">
          <div class="avatar">
            <v-avatar
              tile
              width="120px"
              height="120px"
              class="avatar">
              <v-img :src="getAvatar(leader.avatar, 240)" />
            </v-avatar>
            <v-avatar tile size="40" class="lang-img">
              <v-img :src="getLangImg(leader.lang)" />
            </v-avatar>
          </div>
          <div class="information">
            <div>
              {{ leader.displayName }}
              <span class="version">v.{{ leader.v }}</span>
            </div>
            <nuxt-link
              :to="localePath(`/users/${leader.username}`)"
              class="information-user"
              @click.native="this.$gtag('event', 'leaderboard_to_author')">
              {{ $t("game.by") }} {{ leader.username }}
              <v-avatar class="ml-1" tile size="30">
                <v-img :src="getAvatar(leader.userAvatar, 60)" />
              </v-avatar>
            </nuxt-link>
            <div class="statistic">
              <div>
                <AntHiveIcon
                  icon="challange"
                  class="mx-1"
                  small
                  color="#d1cae8"
                />
                {{ leader.mmr }}
              </div>
              <div>
                <AntHiveIcon
                  icon="trophy"
                  class="mx-1"
                  small
                  color="#d1cae8"
                />
                {{ leader.wins }}
              </div>
              <div>
                <AntHiveIcon
                  icon="trophy-broken"
                  class="mx-1"
                  small
                  color="#d1cae8"
                />
                {{ leader.losses }}
              </div>
              <div>
                <AntHiveIcon
                  icon="trophy-award"
                  class="mx-1"
                  small
                  color="#d1cae8"
                />
                {{ leader.score }}
              </div>
              <div>
                <AntHiveIcon
                  icon="timer"
                  class="mx-1"
                  small
                  color="#d1cae8"
                />
                {{ leader.art }}ms
              </div>
              <div>
                <AntHiveIcon
                  icon="alert"
                  class="mx-1"
                  small
                  color="#d1cae8"
                />
                {{ leader.err }}%
              </div>
              <div class="gradient-layout" />
              <AntHiveButton
                class="button"
                tile
                color="primary"
                @click="goToChallangePage(leader.id)"
              >
                <AntHiveIcon
                  icon="challange"
                  class="mx-1"
                  small
                  color="white" />
                {{ $t("userInfo.challangeMe") }}
              </AntHiveButton>
            </div>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import langs from '../static/langs/data.json'
import Image from '@/mixins/image'
import AntHiveIcon from '@/components/AntHiveIcon'

export default {
  name: 'LeaderboardBotChip',
  components: {
    AntHiveIcon
  },
  mixins: [Image],
  props: {
    leader: { type: Object, required: true },
    place: { type: Number, required: true }
  },
  methods: {
    getLangImg(lang) {
      const currentLang = langs.find(l => l.id === lang)
      return currentLang.img
    },
    goToChallangePage(id) {
      this.$gtag('event', 'leaderboard_challange')
      const challangeUrl = `${process.env.PROFILE_URL}/new-game?challange=${id}`
      window.location.href = challangeUrl
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/style/global.scss';

.leader-card {
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
  align-items: center;
  box-sizing: border-box;
  margin-bottom: -1px;

  .place {
    font-size: $font-bigger;
    font-weight: $font-weight-bold;
    color: $violet;
  }

  .avatar {
    position: relative;
  }

  .lang-img {
    position: absolute;
    left: 0;
    top: 0;
    background-color: $white;
    border-right: 2px solid $white;
    border-bottom: 2px solid $white;
  }

  .information {
    width: 100%;
    position: relative;
    padding: 20px 20px 20px 40px;
    color: $violet;
    font-size: $font-medium;
    font-weight: $font-weight-bold;
  }

  .information-user {
    cursor: pointer;
    font-size: $font-small;
    color: $violet-light;
    position: absolute;
    top: 0;
    right: 0;
  }

  .statistic {
    margin-top: 10px;
    line-height: 40px;
    display: flex;
    justify-content: space-between;
  }

  .version {
    padding-left: 5px;
    color: $violet-light;
    font-weight: $font-weight-normal;
    font-size: $font-medium;
  }

  .gradient-layout {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: $black;
    background: $horizontal-background-gradient;
    opacity: 0;
    transition: all 0.4s;
    pointer-events: none;
  }

  .button {
    opacity: 0;
    transition: all 0.4s;
    letter-spacing: 0;
  }

  &:hover .button,
  &:hover .gradient-layout {
    opacity: 1;
  }
}
@media screen and (max-width: $screen-md) {
  .leader-card {
    .score {
      text-align: center;
    }
    .avatar-name {
      padding-left: 0;
    }
    .name {
      line-height: normal;
      padding-top: 12px;
    }
  }
}
</style>
