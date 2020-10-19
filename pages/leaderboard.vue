<template>
  <section class="leaderboard texture-arrows">
    <v-card class="leaderboard__table">
      <v-row class="leaderboard__table-head">
        <v-col v-if="!$vuetify.breakpoint.smAndDown" cols="6" sm="1" class="leader-card__places">
          <span>{{ $t('leaderboard.place') }}</span>
        </v-col>
        <v-col v-if="!$vuetify.breakpoint.smAndDown" cols="6" sm="7" class="pl-7">
          <span>{{ $t('leaderboard.player') }}</span>
        </v-col>
        <v-col cols="6" sm="2"
          :class="{ 'accent--text': column.value === sortBy }"
          class="leaderboard__table-score"
          v-for="(column, index) in columns"
          :key="index"
          @click="doSort(column.value)"
        >
          {{ $t(`leaderboard.${column.text}`) }}
        </v-col>
      </v-row>
      <GamesLeaderCard
        class="leaderboard__table-player"
        :key="player.Username + index"
        v-for="(player, index) in players"
        :place="index + 1"
        :leader="player"
      />
    </v-card>
  </section>
</template>

<script>
import { search } from '@/services/Bot'
import GamesLeaderCard from '@/components/GamesLeaderCard'
import GamesUserCard from '@/components/GamesUserCard'

export default {
  head() {
    return {
      title: this.$t('leaderboard.meta.title'),
      meta: [
        {
          name: 'description',
          content: this.$t('leaderboard.meta.description')
        }
      ]
    }
  },
  components: {
    GamesLeaderCard,
    GamesUserCard
  },
  name: 'Leaderboard',
  data: () => ({
    players: [],
    sortBy: 'totalWealth',
    columns: [
      {
        text: 'games',
        sortable: true,
        value: 'totalGames'
      },
      {
        text: 'wealth',
        sortable: true,
        value: 'totalWealth'
      }
    ]
  }),
  async fetch() {
    await this.getLeaders()
  },
  methods: {
    async getLeaders() {
      let sortQuery = {}
      sortQuery[this.sortBy] = 'desc'
      this.players = await search(sortQuery)
    },
    async doSort(sort) {
      this.sortBy = sort
      await this.getLeaders()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '@/assets/style/global.scss';
.leaderboard {
  padding: 40px 0;
  &__card {
    padding: 0 10px 10px;
  }
  &__table {
    max-width: 1000px;
    margin: 0 auto;
  }
  &__table-head {
    padding: 0 12px;
    margin: 0;
    text-transform: uppercase;
    font-weight: 500;
  }
  &__table-score {
    text-align: right;
    cursor: pointer;
  }
  &__table-player {
    margin: 0;
  }
  &__user-card {
    margin-bottom: 15px;
  }
  &__sort-item {
    margin-left: 10px;
    cursor: pointer;
  }
  &__top-players {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
}

@media screen and (max-width: $screen-lg) {
  .leaderboard {
    &__top-players {
      width: auto;
      flex-direction: column;
    }
    .headline {
      width: 100%;
      text-align: center;
    }
    &__user-card {
      margin: 0 auto 15px;
    }
  }
}
@media screen and (max-width: $screen-md) {
  .leaderboard {
    &__table-score {
      text-align: center;
    }
  }
}
</style>
