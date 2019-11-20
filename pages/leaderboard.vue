<template lang="pug">
	section
		v-parallax(src="/img/leaderboard_bg.png" height="400")
		v-row.justify-center
			v-col(cols="11" md="9")
				v-card.leaderboard__card
					v-list.py-0
						template(v-for="(player, index) in players")
							v-list-item(:class="(index < 3) && 'orange lighten-5'"  :to="{ path: '/user/?username=' + player.Username}")
								span.ml-2(:class=" (index < 3) && 'title orange--text'") {{index+1}}
								v-list-item-avatar.ml-5(size="70")
									v-img(:src="us.photoUrl(player.Username, 70)" class="grey lighten-4")
									.d-flex.flex-column.ml-n4
										v-avatar(size="30")
											v-img(:src="us.langUrl(player.Lang)")
										v-avatar.grey.lighten-4(size="30")
											v-card-text.pa-0.caption v.{{ player.Version }}
								v-list-item-content.pl-5
									v-list-item-title( :class="(index < 3) && 'title'") {{player.Username}}
									v-list-item-subtitle {{player.Games}} games
								v-list-tile-action.pr-3
									v-list-item-subtitle {{us.scoreString(player.Wealth)}} wealth
								v-list-tile-action.pr-3
									span(:class="(index < 3) && 'title'") {{player.Wg}}
										v-icon.orange--text.text--lighten-2(class="ml-1") bubble_chart
							v-divider
</template>

<script>
import userService from "@/services/User";
import axios from "axios";

export default {
	name: "Leaderboard",
	data: () => ({
		us: userService,
		players:[],
		elastic: axios.create({
			baseURL: 'https://search.anthive.io/',
			timeout: 3000
		})
	}),
	created() {
		this.getPlayers();
	},
	methods:{
		async getPlayers(){
			console.log("loading best players");

			const query = {
				"size": 100,
				"sort": [
					{
						"Wg": {
							"order": "desc"
						}
					}
				]
			};
			const resp = await this.elastic.get("/bots-prod/_search", this.wrap(query));
			this.players = resp.data.hits.hits.map(b => {
				return b._source;
			});
		},
		wrap(query){
			return { params: {
					source: JSON.stringify(query),
					source_content_type: 'application/json'
				}
			};
		},
		pictureUrl(username,size){
			return this.us.photoUrl(username, size);
		}
	}
};
</script>
<style>
.leaderboard__card {
	margin-top: -350px;
}
</style>
