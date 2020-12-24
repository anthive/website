<template>
  <div class="games" v-if="games">
    <v-row>
      <v-col
        cols="12"
        md="2"
        v-for="(game, index) in games"
        :key="index + 'game'"
      >
        <AntHiveGameVertical :game="game" />
      </v-col>
    </v-row>
    <infinite-scroll :enough="enoughLoadGames" @load-more="loadGames" />
  </div>
</template>

<script>
import AntHiveGameVertical from '@/components/AntHiveGameVertical'
import { getGames } from '@/services/Game'

export default {
  name: 'GamesTable',
  props: {
    pageSize: {
      type: Number,
      required: false,
      default: 50
    }
  },
  components: {
    AntHiveGameVertical
  },
  data: () => ({
    searchParams: {},
    games: [],
    enoughLoadGames: false
  }),
  async fetch() {
    if (process.server) {
      await this.loadGames()
    }
  },
  async mounted() {
    await this.loadGames()
  },
  created() {
    this.searchParams = { p: 0, pp: this.pageSize }
  },
  methods: {
    loadGames() {
      this.enoughLoadGames = true
      getGames(this.searchParams).then(games => {
        if (games.length) {
          this.searchParams.p += 1
          this.games = this.games.concat(games)
          this.enoughLoadGames = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';

.games-table {
  &__sort {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 0 3px;
  }
  &__sort-item {
    margin-left: 10px;
    cursor: pointer;
  }
  &__item {
    margin: 24px 0;
  }
  &__bots-container {
    display: flex;
    align-items: center;
  }
  &__bots-more {
    padding: 0 !important;
    display: flex !important;
    min-width: 38px !important;
    height: 34px;
    min-height: 36px;
  }
  &__stats-container {
    display: flex;
    font-weight: 600;
    text-align: center;
  }
  &__stat {
    display: flex;
    flex-direction: column;
    margin: 0 15px;
    position: relative;
  }
  &__stat::after {
    content: '';
    width: 1px;
    height: 26px;
    background-color: #3a315c7a;
    position: absolute;
    top: 6px;
    right: -18px;
  }
  &__stat:last-child::after {
    display: none;
  }
  &__stat-value {
    color: $color-violet-650;
  }
  &__stat-name {
    font-weight: 500;
    color: $color-violet-900;
  }
  &__action-container {
    text-align: center;
  }
  &__meta {
    min-width: 100px;
  }
  &__bots-list {
    width: 560px;
  }
}

.tooltip {
  p {
    color: $color-white;
  }
  &__title {
    font-size: $font-big;
    font-weight: 600;
    padding-top: 10px;
    display: flex;
    line-height: 38px;
    margin-bottom: 10px;
  }
}

@media screen and (max-width: $screen-sm) {
  .games-table {
    &__sort {
      margin: 0;
      justify-content: space-between;
    }
  }
}
</style>
