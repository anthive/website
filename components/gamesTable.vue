<template>
  <div id="games-table">
    <v-row class="d-flex justify-end mx-3">
          <div class="primary--text text-xs-left font-weight-bold">Sort:</div>
          <div
            class="primary--text games-table__sort-item"
            v-for="(column, index) in columns"
            :class="dataTableClasses(column)"
            :key="index"
            @click="doSort(column)"
          >
            {{ $t(column.text) }}
            <v-icon
              small
              v-if="column.hasOwnProperty('sort') && column.sort == 'desc'"
              >arrow_upward</v-icon
            >
            <v-icon
              small
              v-if="column.hasOwnProperty('sort') && column.sort == 'asc'"
              >arrow_downward</v-icon
            >
          </div>
        </v-row>
    <v-card
      class="games-table__item"
      :key="index"
      v-for="(item, index) in items"
      ><div class="d-flex align-center">
        <img
          v-if="!$vuetify.breakpoint.smAndDown"
          class="games-table__item-cover"
          height="100"
          width="80"
          :src="`https://anthive.io/skins/server/${item._source.MapSettings.Skin}/background.png`"
        />
        <div
          :class="{ 'flex-column': $vuetify.breakpoint.smAndDown }"
          class="d-flex col-12 col-md-11 justify-space-between align-center"
        >
          <div
            class="col-12 col-md-2 justify-center justify-md-start d-flex align-center"
          >
            <AuthorChip
              class="ml-md-n11 mr-5"
              :author="item._source.Author"
              :date="item._source.Played"
            ></AuthorChip>
          </div>
          <div
            v-if="item._source.Players.length > 4"
            class="games-table__players-container justify-center col-12 col-md-3"
          >
            <a
              @click="showUserCard(player)"
              :key="pIndex"
              v-for="(player, pIndex) in item._source.Players.slice(0, 4)"
            >
              <UserIcon class="ml-1" :player="player" locale="table"></UserIcon
            ></a>

            <v-avatar
              @click="openGame(item)"
              class="games-table__players-more ml-1"
              size="34"
            >
              +{{ item._source.Players.length - 4 }}
            </v-avatar>
          </div>
          <div
            v-else
            class="games-table__players-container justify-center col-12 col-md-3"
          >
            <a
              @click="showUserCard(player)"
              :key="pIndex"
              v-for="(player, pIndex) in item._source.Players.slice(0, 4)"
            >
            <UserIcon
              class="ml-1"
              :player="player"
            ></UserIcon></a>
          </div>
          <div
            class="games-table__stats-container justify-center col-12 col-md-3"
          >
            <div class="games-table__stat">
              <div class="games-table__stat-value">{{ item._source.Age }}</div>
              <div class="games-table__stat-name">Ticks</div>
            </div>
            <div class="games-table__stat">
              <div class="games-table__stat-value">
                {{ item._source.Wealth }}
              </div>
              <div class="games-table__stat-name">Wealth</div>
            </div>
          </div>
          <div class="games-table__action-container col-12 col-md-2">
            <AntHiveBtn @click="openGame(item)" fill>View Game</AntHiveBtn>
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
      ></v-pagination>
    </v-toolbar>
    <v-dialog v-model="isShowUserCard" width="380">
      <UserCard :player="selectedPlayer"></UserCard>
    </v-dialog>
  </div>
</template>


<script>
import UserCard from '@/components/UserInfo/UserCard'
import UserChip from '@/components/UserInfo/UserChip'
import AuthorChip from '@/components/UserInfo/AuthorChip'
import UserIcon from '@/components/UserInfo/UserIcon'
import { timeAgo } from '@/services/User'
import { search } from '@/services/Game'

export default {
  name: 'gamesTable',
  components: {
    UserChip,
    UserIcon,
    AuthorChip,
    UserCard
  },
  props: {
    PageSize: {
      type: Number,
      required: true,
      default: () => 10
    },
    Filters: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  data: () => ({
    // us: userService,
    loading: false,
    pages: 0,
    currentPage: 1,
    sort: [],
    isShowUserCard: false,
    selectedPlayer: {},
    columns: [
      {
        text: 'gamesTicks',
        align: 'left',
        sortable: true,
        value: 'Age'
      },
      {
        text: 'gamesWealth',
        align: 'right',
        sortable: true,
        sort: 'desc',
        value: 'Wealth'
      },
      {
        text: 'gamesDate',
        align: 'right',
        sortable: true,
        value: 'Played'
      }
    ],
    items: []
  }),
  created() {
    this.preapareSort()
    this.loadGames()
  },
  methods: {
    changePage(pageNumber) {
      this.currentPage = pageNumber
      this.loadGames()
    },
    showUserCard(player) {
      this.selectedPlayer = player
      this.isShowUserCard = true
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

    //READY
    getColumnData(data, field) {
      let value = ''
      switch (field.value) {
        case 'Age':
          value = data._source.Age
          break
        case 'Played':
          value = timeAgo(data._source.Played) + "<br><span class='primary--text'>by " + data._source.Author + '</span>'
          break
        case 'Wealth':
          value = data._source.Wealth
          break
      }
      return value
    },

    async loadGames() {
      this.loading = true
      search(this.sort, this.currentPage, this.PageSize, this.Filters).then(games => {
        if (games != null) {
          this.pages = Math.ceil(games.total.value / this.PageSize)
          this.items = games.hits
        }
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/global.scss';
.games-table {
  &__sort-item {
    margin-left: 10px;
    cursor: pointer;
  }
  &__item {
    border-radius: 12px !important;
    margin: 10px 0;
  }
  &__item-cover {
    border-top-left-radius: 12px;
    border-bottom-left-radius: 12px;
  }
  &__players-container {
    display: flex;
    align-items: center;
  }
  &__players-more {
    color: white;
    transition: 0.5s;
    background-color: $color-accent;
    cursor: pointer;
  }
  &__players-more:hover {
    border: 2px solid $color-accent;
    background: white;
    color: black;
    transition: 0.5s;
  }
  &__stats-container {
    display: flex;
    font-weight: 700;
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
    color: $color-accent;
  }
  &__stat-name {
    color: $color-primary;
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
</style>
