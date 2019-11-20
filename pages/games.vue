<template lang="pug">
	section
		v-parallax(src="/img/home_bg.png" height="300")
		v-row(align="center" justify="center" )
			v-col(cols="11" md="10")
				v-card.games__card( flat tile class="white text-xs-left pa-3 elevation-6 ")
					v-card-title.mb-10
						h1.headline
							span.grey--text All battles:
							span.ml-2 Explore, watch, replay, learn strategies
					v-card-text
						GamesTable(:Filters="filters" :PageSize=17 :ShowTitle="false")
</template>

<script>
import userService from "@/services/User";
import GamesTable from "@/components/gamesTable";

export default {
	name: 'defaultHeader',
	data: () => ({
		us: userService,
		filters: [],
		user: {}
	}),
	created() {
		this.filters = [
			{"term": { "Age": 1000 }},
			{"range": { "Wealth": { "gte": 1000, "lte": 3000 }}}
		];
	},
	components: {
		GamesTable
	}
}
</script>

<style>
.games__card {
	margin-top: -178px;
}
</style>
