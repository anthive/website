<template>
  <div id="games-table" class="games-table">
    <v-card
      tile
      class="games-table__item"
      :key="index"
      v-for="(game, index) in games"
    >
      <div class="d-flex align-center">
        <img
          v-if="!$vuetify.breakpoint.smAndDown"
          class="games-table__item-cover"
          height="100"
          width="80"
          :src="`https://anthive.io/skins/server/${game.mapSettings.theme}/background.png`"
          alt="Background"
        />
        <div
          :class="{ 'flex-column': $vuetify.breakpoint.smAndDown }"
          class="d-flex col-12 col-md-11 justify-space-between align-center"
        >
          <div
            class="col-12 col-md-2 justify-center justify-md-start d-flex align-center"
          >
            <AuthorChip
              class="ml-md-n13 mr-5"
              :author="game.author"
              :date="game.finished"
            />
          </div>
          <div
            v-if="game.bots && game.bots.length > 4"
            class="games-table__players-container justify-center col-12 col-md-3"
          >
            <div
              :key="pIndex"
              v-for="(player, pIndex) in game.bots.slice(0, 4)"
            >
              <v-tooltip bottom color="accent" content-class="b-radius-0">
                <template v-slot:activator="{ on }">
                  <div v-on="on">
                    <UserIcon class="ml-1" :player="player" locale="table" />
                  </div>
                </template>
                {{ player.username }}
              </v-tooltip>
            </div>

            <AntHiveButton
              tile
              color="accent"
              :to="
                localePath({
                  name: 'game',
                  query: { id: game.id, v: game.version },
                })
              "
              class="games-table__players-more ml-1"
            >
              <span>+{{ game.bots.length - 4 }}</span>
            </AntHiveButton>
          </div>
          <div
            v-if="game.bots && game.bots.length <= 4"
            class="games-table__players-container justify-center col-12 col-md-3"
          >
            <div
              :key="pIndex"
              v-for="(player, pIndex) in game.bots.slice(0, 4)"
            >
              <v-tooltip bottom color="accent" content-class="tooltip b-radius-0">
                <template v-slot:activator="{ on }">
                  <div v-on="on">
                    <UserIcon class="ml-1" :player="player" />
                  </div>
                </template>
                <div class="tooltip__title">
                  <span><UserIcon class="mr-2" :player="player" /></span>
                  <span>{{ player.name }}</span>
                </div>
                <p>
                  <strong>{{ $t("game.spawn") }}</strong><br>
                  X: {{ player.spawn.x }}<br>
                  Y: {{ player.spawn.y }}
                </p>
                <p>
                  <strong>{{ $t("game.statistics") }}</strong><br>
                  {{ $t("game.ants") }}: {{ player.stats.ants }}<br>
                  {{ $t("game.hiveSize") }}: {{ player.stats.hive }}<br>
                  {{ $t("game.score") }}: {{ player.stats.score }}<br>
                  {{ $t("game.art") }}: {{ player.stats.art }}<br>
                  {{ $t("game.age") }}: {{ player.stats.age }}<br>
                  {{ $t("game.errors") }}: {{ player.stats.errors }}
                </p>
              </v-tooltip>
            </div>
          </div>
          <div
            class="games-table__stats-container justify-center col-12 col-md-3"
          >
            <div class="games-table__stat">
              <div class="games-table__stat-value">{{ game.age }}</div>
              <div class="games-table__stat-name">{{ $t("games.ticks") }}</div>
            </div>
          </div>
          <div class="games-table__action-container col-12 col-md-3">
            <AntHiveButton
              tile
              :to="
                localePath({
                  name: 'game',
                  query: { id: game.id, v: game.version },
                })
              "
              width="100%"
              color="accent"
            >
              {{ $t("games.viewGame") }}
            </AntHiveButton>
          </div>
        </div>
      </div>
    </v-card>
    <v-toolbar flat>
      <v-pagination
        class="mx-auto pagination"
        :length="totalPages"
        v-model="selectedPage"
        total-visible="10"
        color="accent"
        next-icon=">"
        prev-icon="<"
      />
    </v-toolbar>
  </div>
</template>

<script>
import UserCard from '@/components/GamesUserCard'
import UserChip from '@/components/GamesUserChip'
import AuthorChip from '@/components/GamesAuthorChip'
import UserIcon from '@/components/GamesUserIcon'
import AntHiveIcon from '@/components/AntHiveIcon'
import { getGames } from '@/services/Game'

export default {
  name: 'GamesTable',
  props: {
    gamesLimit: {
      type: Number,
      required: false,
      default: 10
    }
  },
  components: {
    UserChip,
    UserIcon,
    AuthorChip,
    UserCard,
    AntHiveIcon
  },
  data: () => ({
    searchParams: {},
    totalPages: 0,
    selectedPage: 1,
    games: []
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
    this.searchParams = { page: 1, limit: this.gamesLimit }
  },
  methods: {
    loadGames() {
      return getGames(this.searchParams).then(gamesResp => {
        this.games = gamesResp.games
        this.totalPages = Math.ceil(gamesResp.total / this.searchParams.limit)
      })
    }
  },
  watch: {
    async selectedPage(pageNumber) {
      this.searchParams.page = pageNumber
      await this.loadGames()
    }
  }
}
</script>
<style lang="scss">
.games-table {
  .pagination {
    .v-pagination__item,
    .v-pagination__navigation {
      border-radius: 0;
    }
  }
}
</style>
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
  &__players-container {
    display: flex;
    align-items: center;
  }
  &__players-more {
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
  &__players-list {
    width: 560px;
  }
}

.tooltip {
  p {
    color: $color-white;
  }
  &__title {
    font-size: 16px;
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
