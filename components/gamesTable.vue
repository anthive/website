
<template lang="pug">
  #games-table
    v-data-table(
      :loading="loading"
      loading-text="Loading... Please wait"
      :headers="columns"
      :items="items"
      hide-default-header
      hide-default-footer
      class="text-xs-center"
    )
      template(v-slot:header="{ props: { headers } }") 
        tr
          th(class="text-xs-left") Players
          th(
            v-for="(column, index) in headers"
            :class="dataTableClasses(column)"
            :key="index"
            @click="doSort(column)"
          ) {{ column.text }}
            v-icon(
              small
              v-if="(column.hasOwnProperty('sort')) && column.sort =='desc'"
            ) arrow_upward
            v-icon(
              small
              v-if="(column.hasOwnProperty('sort')) && column.sort == 'asc'"
            ) arrow_downward
      template(v-slot:item=" { item } ")
        tr(style="cursor: pointer;")
          td.py-1.text-xs-left(@click.self="openGame(item)")
            userInfo.ma-3(
              v-for="(player, pIndex) in item._source.Players"
              :key="player.id"
              :username="player.Username"
              :lang="player.Lang"
              :version="player.Version"
              :skin="player.Skin"
              :score="player.Wealth"
            )
          td.games-table__meta.subheading(
            @click="openGame(item)"
            v-for="(column, index) in columns"
            :key="index"
            v-html="getColumnData(item, column)"
          )

    v-toolbar(flat)
      v-pagination(
        @input="changePage($event)"
        v-model="currentPage"
        :length="pages"
        total-visible="10"
        class="mx-auto"
        color="orange darken-3"
      )
</template>

<script>
import userInfo from "@/components/UserInfo";
import userService from "@/services/User";
import searchService from "@/services/Search";

export default {
	name: "gamesTable",
	components: {
    	userInfo
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
		us: userService,
		loading: false,
		pages: 0,
		currentPage: 1,
		sort:[],
		columns: [
      		{
				text: "Ticks",
				align: "left",
				sortable: true,
				value: "Age"
			},
			{
				text: "Wealth",
				align: "right",
				sortable: true,
				sort: "desc",
				value: "Wealth"
			},
			{
				text: "Date",
				align: "right",
				sortable: true,
				value: "Played"
			}
    	],
    	items: []
  	}),
  	created() {
		this.preapareSort()
		this.loadGames();
	},
  	methods: {
		changePage(pageNumber) {
			this.currentPage = pageNumber;
			this.loadGames();
		},

		doSort(field) {
			if (!field.sortable) return;

			if (field.sort == null) {
				field.sort = "asc";
			} else if (field.sort == "asc"){
				field.sort = "desc";
			} else if (field.sort == "desc"){
				field.sort = null;
			}

			this.preapareSort()
			this.loadGames();
		},

		preapareSort(){
			this.sort = [];
			this.columns.forEach(col => {
				if (col.sort != null){
					let sr = {};
					sr[col.value] = col.sort;
					this.sort.push(sr);
				}
			});
		},

		dataTableClasses(column) {
			return [
				"column",
				column.sortable ? "sortable" : "",
				//column.sort != null ? "desc" : "asc",
				// delete if not need more
				column.sort != null ? "active" : ""
			];
		},

		openGame(data){
			this.$router.push("/game/?id="+data._id+"&v="+data._source.Version);
		},

		//READY
		getColumnData(data, field) {
			let value = '';
			switch (field.value) {
				case 'Age':
					value = data._source.Age
					break;
				case 'Played':
					value = this.us.timeAgo(data._source.Played)+"<br><span class='grey--text'>by "+
						data._source.Author+"</span>"
					break;
				case 'Wealth':
					value = data._source.Wealth
					break;
			}
			return value;
		},

		async loadGames() {
			this.loading = true;
			searchService.searchGames(this.sort, this.currentPage, this.PageSize, this.Filters).then(games =>{
				if (games != null) {
					this.pages = Math.ceil(games.total/this.PageSize);
					// TODO:
					// use $emit  to pass data back to parent games.total;
					// https://forum.vuejs.org/t/passing-data-back-to-parent/1201
					console.log(games);
					
					this.items = games.hits;
				}
				this.loading = false;
			});
		}
  	}
};
</script>

<style>
.games-table__meta {
	min-width: 100px;
}
</style>
