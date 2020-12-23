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
          :src="getImage(game.mapSettings.theme)"
          alt="Background"
        />
        <div
          :class="{ 'flex-column': $vuetify.breakpoint.smAndDown }"
          class="d-flex col-12 col-md-11 justify-space-between align-center"
        >
          <div
            class="col-12 col-md-2 justify-center justify-md-start d-flex align-center"
          >
            <AntHiveAuthor
              class="ml-md-n13 mr-5"
              :author="game.author"
              :date="game.finished"
            />
          </div>
          <div
            v-if="game.bots && game.bots.length > 4"
            class="games-table__bots-container justify-center col-12 col-md-3"
          >
            <div
              :key="pIndex"
              v-for="(bot, pIndex) in game.bots.slice(0, 4)"
            >
             <div>
                <AntHiveBotSmall class="ml-1" :avatar="bot.avatar" locale="table" />
              </div>
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
              class="games-table__bots-more ml-1"
            >
              <span>+{{ game.bots.length - 4 }}</span>
            </AntHiveButton>
          </div>
          <div
            v-if="game.bots && game.bots.length <= 4"
            class="games-table__bots-container justify-center col-12 col-md-3"
          >
            <div
              :key="pIndex"
              v-for="(bot, pIndex) in game.bots.slice(0, 4)"
            >
              <div>
                <AntHiveBotSmall class="ml-1" :avatar="bot.avatar" />
              </div>
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
                  query: { id: game.id, v: game.v },
                })
              "
              color="accent"
            >
              {{ $t("games.viewGame") }}
            </AntHiveButton>
          </div>
        </div>
      </div>
    </v-card>
    <infinite-scroll :enough="enoughLoadGames" @load-more="loadGames" />
  </div>
</template>

<script>
import AntHiveAuthor from '@/components/AntHiveAuthor'
import AntHiveBotSmall from '@/components/AntHiveBotSmall'
import { getGames } from '@/services/Game'
import { getImageById } from '@/services/Image'

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
    AntHiveBotSmall,
    AntHiveAuthor
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
    getImage(id) {
      return getImageById(`${id}-background.png`, 150, 200)
    },
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
