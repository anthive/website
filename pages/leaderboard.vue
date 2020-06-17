<template>
  <section>
    <v-parallax src="/img/bg.jpg" height="400"></v-parallax>
    <v-container class="px-2">
      <v-card class="leaderboard__card">
        <v-card-title class="mb-3 d-flex justify-space-between align-center">
          <h1 class="headline">
            <span class="primary--text font-weight-medium">Leaderboard:</span>
            <span class="primary--text ml-2"
              >The most skillful AntHive players
            </span>
          </h1>
          <div class="d-flex col-3 justify-space-around">
            <span class="primary--text">Top by: </span>
            <div
              :class="{ 'accent--text': column.value === sortBy }"
              class="primary--text leaderboard__sort-item"
              v-for="(column, index) in columns"
              :key="index"
              @click="doSort(column.value)"
            >
              {{ column.text }}
            </div>
          </div>
        </v-card-title>
        <span class="primary--text text-center d-block title my-4"
          >Top 3 <span v-if="sortBy === 'totalWealth'">wealthy</span>
          <span v-if="sortBy === 'totalGames'">hard</span> AntHive players
        </span>
        <div class="d-flex justify-space-around">
          <UserCard
            :key="index"
            v-for="(player, index) in top3Players"
            :place="index + 1"
            :player="player"
          />
        </div>
        <span class="primary--text text-center d-block title my-4"
          >Top 100 <span v-if="sortBy === 'totalWealth'">wealthy</span>
          <span v-if="sortBy === 'totalGames'">hard</span> AntHive players
        </span>
        <LeaderCard
          class="my-3"
          :key="index"
          v-for="(player, index) in top100Players"
          :place="index + 4"
          :leader="player"
        />
      </v-card>
    </v-container>
  </section>
</template>

<script>
import { search } from '@/services/Bot'
import LeaderCard from '@/components/UserInfo/LeaderCard'
import UserCard from '@/components/UserInfo/UserCard'

export default {
  components: {
    LeaderCard,
    UserCard
  },
  name: 'Leaderboard',
  data: () => ({
    players: [],
    sortBy: 'totalWealth',
    columns: [
      {
        text: 'Games',
        sortable: true,
        value: 'totalGames'
      },
      {
        text: 'Wealth',
        sortable: true,
        value: 'totalWealth'
      }
    ]
  }),
  created() {
    this.getLeaders()
  },
  computed: {
    top3Players() {
      let players = this.players
      return players.filter((player, index) => {
        return index <= 2
      })
    },
    top100Players() {
      let players = this.players
      return players.filter((player, index) => {
        return index > 2
      })
    }
  },
  methods: {
    async getLeaders() {
      let sortQuery = {}
      sortQuery[this.sortBy] = 'desc'
      search(sortQuery).then(leaders => {
        console.log('start search')
        this.players = leaders
      })
    },
    async doSort(sort) {
      this.sortBy = sort
      await this.getLeaders()
    }
  }
}
</script>
<style lang="scss" scoped>
.leaderboard {
  &__card {
    margin-top: -350px;
    padding-bottom: 10px;
  }
  &__sort-item {
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>
