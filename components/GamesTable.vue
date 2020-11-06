<template>
  <div id="games-table" class="games-table">
    <v-card
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
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <div v-on="on">
                    <UserIcon class="ml-1" :player="player" locale="table" />
                  </div>
                </template>
                {{ player.username }}
              </v-tooltip>
            </div>

            <AntHiveBtn
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
            </AntHiveBtn>
          </div>
          <div
            v-if="game.bots && game.bots.length <= 4"
            class="games-table__players-container justify-center col-12 col-md-3"
          >
            <div
              :key="pIndex"
              v-for="(player, pIndex) in game.bots.slice(0, 4)"
            >
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <div v-on="on">
                    <UserIcon class="ml-1" :player="player" />
                  </div>
                </template>
                {{ player.name }}, {{ player.spawn }}, {{ player.stats }}
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
            <AntHiveBtn
              tile
              :to="
                localePath({
                  name: 'game',
                  query: { id: game.id, v: game.version },
                })
              "
              width="100%"
              color="accent"
              >{{ $t("games.viewGame") }}</AntHiveBtn
            >
          </div>
        </div>
      </div>
    </v-card>
        <v-toolbar flat>
      <v-pagination
        class="mx-auto"
        :length="totalPages"
        v-model="selectedPage"
        total-visible="10"
        color="accent"
        next-icon=">"
        prev-icon="<"
      ></v-pagination>
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
  components: {
    UserChip,
    UserIcon,
    AuthorChip,
    UserCard,
    AntHiveIcon
  },
  data: () => ({
    searchParams: { page: 1, limit: 10 },
    totalPages: 0,
    selectedPage: 1,
    games: []
  }),
  async fetch() {
    await this.loadGames()
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
    border-radius: $border-radius-default !important;
    margin: 10px 0;
  }
  &__item-cover {
    border-top-left-radius: $border-radius-default;
    border-bottom-left-radius: $border-radius-default;
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
    color: $color-red-300;
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

@media screen and (max-width: $screen-sm) {
  .games-table {
    &__sort {
      margin: 0;
      justify-content: space-between;
    }
  }
}
</style>
