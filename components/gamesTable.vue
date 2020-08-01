<template>
  <div id="games-table" class="games-table">
    <v-row class="games-table__sort">
      <div>
        <span class="primary--text f-text">Season </span
        ><v-btn-toggle v-model="version" color="success" dense class="mx-2">
          <v-btn value="3.0">
            3
          </v-btn>

          <v-btn value="4.0">
            4
          </v-btn>
        </v-btn-toggle>
      </div>
      <div class="primary--text text-xs-left font-weight-bold">
        {{ $t("games.sort") }}:
      </div>
      <div
        class="primary--text games-table__sort-item"
        v-for="(column, index) in columns"
        :class="dataTableClasses(column)"
        :key="index"
        @click="doSort(column)"
      >
        {{ $t(column.text) }}
        <AntHiveIcon
          small
          v-if="column.hasOwnProperty('sort') && column.sort == 'desc'"
          >arrow-up</AntHiveIcon
        >
        <AntHiveIcon
          small
          v-if="column.hasOwnProperty('sort') && column.sort == 'asc'"
          >arrow-down</AntHiveIcon
        >
      </div>
    </v-row>
    <v-card
      class="games-table__item"
      :key="index"
      v-for="(item, index) in items"
      ><div v-if="item.bots" class="d-flex align-center">
        <img
          v-if="!$vuetify.breakpoint.smAndDown"
          class="games-table__item-cover"
          height="100"
          width="80"
          :src="`https://anthive.io/skins/server/${item.map.theme}/background.png`"
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
              :author="item.author"
              :date="item.finished"
            />
          </div>
          <div
            v-if="item.bots && item.bots.length > 4"
            class="games-table__players-container justify-center col-12 col-md-3"
          >
            <div
              :key="pIndex"
              v-for="(player, pIndex) in item.bots.slice(0, 4)"
              @click="openProfile(player.username)"
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
              color="accent"
              :to="
                localePath({
                  name: 'game',
                  query: { id: item.id, v: item.version },
                })
              "
              class="games-table__players-more ml-1"
            >
              <span>+{{ item.bots.length - 4 }}</span>
            </AntHiveBtn>
          </div>
          <div
            v-if="item.bots && item.bots.length <= 4"
            class="games-table__players-container justify-center col-12 col-md-3"
          >
            <div
              :key="pIndex"
              v-for="(player, pIndex) in item.bots.slice(0, 4)"
              @click="openProfile(player.username)"
            >
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <div v-on="on">
                    <UserIcon class="ml-1" :player="player" />
                  </div>
                </template>
                {{ player.username }}
              </v-tooltip>
            </div>
          </div>
          <div
            class="games-table__stats-container justify-center col-12 col-md-3"
          >
            <div class="games-table__stat">
              <div class="games-table__stat-value">{{ item.age }}</div>
              <div class="games-table__stat-name">{{ $t("games.ticks") }}</div>
            </div>
            <div v-if="item.wealth" class="games-table__stat">
              <div class="games-table__stat-value">
                {{ item.wealth }}
              </div>
              <div class="games-table__stat-name">{{ $t("games.wealth") }}</div>
            </div>
          </div>
          <div class="games-table__action-container col-12 col-md-2">
            <AntHiveBtn
              :to="
                localePath({
                  name: 'game',
                  query: { id: item.id, v: item.version },
                })
              "
              width="100%"
              color="accent"
              >{{ $t("games.viewGame") }}</AntHiveBtn
            >
          </div>
        </div>
      </div></v-card
    >
    <v-toolbar flat>
      <v-pagination
        class="mx-auto"
        @input="changePage($event)"
        v-model="currentPage"
        :length="pages"
        total-visible="10"
        color="accent"
        next-icon=">"
        prev-icon="<"
      ></v-pagination>
    </v-toolbar>
  </div>
</template>

<script>
import UserCard from '@/components/UserInfo/UserCard'
import UserChip from '@/components/UserInfo/UserChip'
import AuthorChip from '@/components/UserInfo/AuthorChip'
import UserIcon from '@/components/UserInfo/UserIcon'
import AntHiveIcon from '@/components/global/AntHiveIcon'
import { search } from '@/services/Game'

export default {
  name: 'gamesTable',
  components: {
    UserChip,
    UserIcon,
    AuthorChip,
    UserCard,
    AntHiveIcon
  },
  props: {
    PageSize: {
      type: Number,
      required: true,
      default: () => 10
    },
    Username: {
      type: String,
      default: ''
    },
    Filters: {
      type: Object,
      default() {
        return {
          match_all: {}
        }
      }
    }
  },
  data: () => ({
    // us: userService,
    loading: false,
    pages: 0,
    version: '4.0',
    currentPage: 1,
    sort: [],
    columns: [
      {
        text: 'games.ticks',
        align: 'left',
        sortable: true,
        value: 'Age'
      },
      {
        text: 'games.wealth',
        align: 'right',
        sortable: true,
        sort: 'desc',
        value: 'Wealth'
      },
      {
        text: 'games.date',
        align: 'right',
        sortable: true,
        value: 'Played'
      }
    ],
    items: []
  }),
  async fetch() {
    await this.preapareSort()
    await this.loadGames()
  },
  methods: {
    changePage(pageNumber) {
      this.currentPage = pageNumber
      this.loadGames()
    },
    doSort(field) {
      if (!field.sortable) return

      if (field.sort == null) {
        field.sort = 'asc'
      } else if (field.sort == 'asc') {
        field.sort = 'desc'
      } else if (field.sort == 'desc') {
        field.sort = null
      }

      this.preapareSort()
      this.loadGames()
    },

    preapareSort() {
      this.sort = []
      this.columns.forEach(col => {
        if (col.sort != null) {
          let sr = {}
          sr[col.value] = col.sort
          this.sort.push(sr)
        }
      })
    },

    dataTableClasses(column) {
      return [
        'column',
        column.sortable ? 'sortable' : '',
        //column.sort != null ? "desc" : "asc",
        column.sort != null ? 'active' : ''
      ]
    },

    openGame(data) {
      this.$router.push('/game/?id=' + data._id + '&v=' + data._source.Version)
    },

    openProfile(username) {
      this.$router.push('/user?username=' + username)
    },

    async loadGames() {
      this.loading = true
      const response = await search(this.sort, this.currentPage, this.PageSize, this.version, this.Username)
      if (!response) return
      this.pages = Math.ceil(
        response.total % this.PageSize > 0 ? response.total / this.PageSize : response.total / this.PageSize - 1
      )
      this.items = response.games
      this.loading = false
    }
  },
  watch: {
    version() {
      this.loadGames()
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
