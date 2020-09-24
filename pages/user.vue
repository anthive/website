<template>
  <section class="user">
    <v-row class="justify-center">
      <v-col cols="11" lg="3">
        <v-card>
          <v-img  :src="user.avatar" v-if="user.avatar" />
          <v-card-title>
            <h3 class="headline">{{ user.name }}</h3>
          </v-card-title>
          <v-card-text class="user__card-text pt-0" v-if="user.company">
            <AntHiveIcon class="mr-2">people</AnthiveIcon
            ><span>{{ user.company }}</span></v-card-text
          >
          <v-card-text class="user__card-text pt-0" v-if="user.location">
            <AntHiveIcon class="mr-2">place</AnthiveIcon
            ><span>{{ user.location }}</span></v-card-text
          >
          <v-card-text class="user__card-text pt-0" v-if="user.blog">
            <AntHiveIcon class="mr-2">public</AnthiveIcon
            ><a :href="user.blog" target="_blank" rel="noreferrer">{{
              user.blog
            }}</a></v-card-text
          >
        </v-card>
      </v-col>
      <v-col cols="11" lg="7" xl="5">
        <!-- TODO: implement Chart -->
      </v-col>
      <v-col class="mt-4" cols="11" lg="8">
        <h3 class="headline mt-1 mb-3">
          {{ $t("userInfo.games") }}
          <!--TODO: use v-on span(class="grey--text") ({{ totalGames }})-->
        </h3>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import AreaChart from '@/components/AreaChart'
import GamesUserCard from '@/components/GamesUserCard'
import { User } from '@/services/User'
import AntHiveIcon from '@/components/AntHiveIcon'

export default {
  name: 'user',
  components: {
    AreaChart,
    GamesUserCard,
    AntHiveIcon
  },
  data: () => ({
    status: null,
    user: {},
    us: null,
    filters: [],
    userChartData: [
      ['Jan 1', 938, 522],
      ['Jan 2', 1120, 599],
      ['Jan 3', 1167, 587],
      ['Jan 4', 1110, 615],
      ['Jan 5', 691, 629],
      ['Jan 6', 712, 810],
      ['Jan 7', 810, 950],
      ['Jan 8', 950, 1100],
      ['Jan 9', 1100, 1350],
      ['Jan 10', 1200, 1150]
    ]
  }),
  created() {
    var username = this.$route.query.username

    if (username === '' || username === undefined) {
      username = 'anthive'
    }
    this.us = new User()
    this.filters = { term: { 'Players.Username': username } }
    this.us.getUserdata(username).then(result => {
      this.user = result
    })
  }
}
</script>
<style lang="scss" scoped>
.user {
  overflow-x: hidden;
  &__card-text {
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
