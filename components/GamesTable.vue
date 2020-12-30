<template>
  <div v-if="games">
    <div class="games">
      <AntHiveGameVertical
        v-for="(game, index) in games"
        :key="index + 'game'"
        :game="game"
      />
    </div>
    <infinite-scroll :enough="enoughLoadGames" @load-more="loadGames" />
  </div>
</template>

<script>
import AntHiveGameVertical from '@/components/AntHiveGameVertical'
import { getGames } from '@/services/Game'

export default {
  name: 'GamesTable',
  components: {
    AntHiveGameVertical
  },
  props: {
    pageSize: {
      type: Number,
      required: false,
      default: 50
    }
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
      getGames(this.searchParams).then((games) => {
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

.games {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -20px;
}
</style>
