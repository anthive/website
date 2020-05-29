<template>
  <div id="games-table">
    <v-data-table
      class="text-xs-center"
      :loading="loading"
      :loading-text="$t('gamesLoading')"
      :headers="columns"
      :items="items"
      hide-default-header
      hide-default-footer
    >
      <template v-slot:header="{ props: { headers } }">
        <tr>
          <th class="text-xs-left">{{ $t("gamesPlayer") }}</th>
          <th
            class="primary--text"
            v-for="(column, index) in headers"
            :class="dataTableClasses(column)"
            :key="index"
            @click="doSort(column)"
          >
            {{ $t(column.text) }}
            <v-icon
              small
              v-if="(column.hasOwnProperty('sort')) &amp;&amp; column.sort =='desc'"
              >arrow_upward</v-icon
            >
            <v-icon
              small
              v-if="(column.hasOwnProperty('sort')) &amp;&amp; column.sort == 'asc'"
              >arrow_downward</v-icon
            >
          </th>
        </tr>
      </template>
      <template v-slot:item="{ item }">
        <tr style="cursor: pointer;">
          <td class="games-table__players-list py-1 text-xs-left" @click.self="openGame(item)">
            <userChip
              class="ma-1"
              :isOpened="true"
              v-for="(player, pIndex) in item._source.Players"
              :player="player"
              :key="pIndex"
              locale="table"
            ></userChip>
          </td>
          <td
            class="games-table__meta subheading"
            @click="openGame(item)"
            v-for="(column, index) in columns"
            :key="index"
            v-html="getColumnData(item, column)"
          ></td>
        </tr>
      </template>
    </v-data-table>
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
  </div>
</template>


<script>
import userChip from '@/components/UserChip'
import { timeAgo } from '@/services/User'
import { searchGames } from '@/services/Search'

export default {
  name: 'gamesTable',
  components: {
    userChip
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
    console.log(process.env)
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
      searchGames(this.sort, this.currentPage, this.PageSize, this.Filters).then(games => {
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
.games-table {
  &__meta {
    min-width: 100px;
  }
  &__players-list {
    width: 560px;
  }
}
</style>
