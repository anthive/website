<template>
  <section>
    <v-row class="ma-10 justify-center">
      <v-col cols="11" lg="3">
        <v-card max-width="250">
          <v-img min-width="250" :src="user.avatar" v-if="user.avatar"></v-img>
          <v-card-title>
            <h3 class="headline">{{ user.name }}</h3>
          </v-card-title>
          <v-card-text class="user__card-text pt-0" v-if="user.company">
            <v-icon class="mr-2" size="20">people</v-icon
            ><span>{{ user.company }}</span></v-card-text
          >
          <v-card-text class="user__card-text pt-0" v-if="user.location">
            <v-icon class="mr-2" size="20">place</v-icon
            ><span>{{ user.location }}</span></v-card-text
          >
          <v-card-text class="user__card-text pt-0" v-if="user.blog">
            <v-icon class="mr-2" size="20">public</v-icon
            ><a :href="user.blog" target="_blank">{{
              user.blog
            }}</a></v-card-text
          >
        </v-card>
      </v-col>
      <v-col cols="11" lg="7" xl="5">
        <h3 class="headline mt-1 mb-3">{{ $t("userTitle") }}</h3>
        <Chart
          class="elevation-1"
          :values="userChartData"
          username="kezlya"
        ></Chart>
      </v-col>
      <v-col class="mt-4" cols="11" lg="8">
        <h3 class="headline mt-1 mb-3">
          {{ $t("userGames") }}
          <!--TODO: use v-on span(class="grey--text") ({{ totalGames }})-->
        </h3>
        <gamesTable :Filters="filters" :PageSize="17"></gamesTable>
      </v-col>
    </v-row>
  </section>
</template>

<script>
import Chart from '@/components/chart'
import gamesTable from '@/components/gamesTable'
import UserCard from '@/components/UserInfo/UserCard'
import { User } from '@/services/User'

export default {
  name: 'user',
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
      this.$router.push('/leaderboard')
      return
    }
    this.us = new User()
    this.filters = { term: { 'Players.Username': username } }
    this.us.getUserdata(username).then(result => {
      console.log('result', result)
      this.user = result
    })
  },
  components: {
    gamesTable,
    Chart,
    UserCard
  }
}
</script>
<style>
.user__card-text {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
