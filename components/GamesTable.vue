<template>
  <div>
    <div v-if="games.length">
      <div class="games">
        <AntHiveGameVertical
          v-for="(game, index) in games"
          :key="index + 'game'"
          :game="game"
        />
      </div>
      <infinite-scroll :enough="enoughLoadGames" @load-more="loadGames" />
    </div>
    <div v-else class="games">
      <v-skeleton-loader
        v-for="skeleton in 18"
        :key="skeleton + 'skeleton'"
        tile
        width="320px"
        height="280px"
        class="ma-5"
        type="image, actions"
      />
    </div>
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
    },
    sortType: {
      type: String,
      required: false,
      default: ''
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
  watch: {
    sortType() {
      this.games = []
      this.searchParams.p = 0
      this.searchParams.sb = this.sortType
      this.enoughLoadGames = false
      this.loadGames()
    }
  },
  async mounted() {
    await this.loadGames()
  },
  created() {
    this.searchParams = { p: 0, pp: this.pageSize, sb: this.sortType }
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
