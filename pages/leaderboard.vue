<template lang="pug">
	section
		v-parallax(src="/img/leaderboard_bg.png" height="400")
		v-row.justify-center
			v-col(cols="11" md="9")
				v-card.leaderboard__card
					v-list.py-0
						template(v-for="(player, index) in players")
							p {{ player.text }}
							v-list-item(:class="(index < 3) && 'orange lighten-5'"  :to="{ path: '/user/?username=' + player.Username}")
								span.ml-2(:class=" (index < 3) && 'title orange--text'") {{index+1}}
								v-list-item-avatar.ml-5(size="70")
									v-img(:src="player.photoUrl()" class="grey lighten-4")
									.d-flex.flex-column.ml-n4
										v-avatar(size="30")
											v-img(:src="player.langUrl()")
										v-avatar.grey.lighten-4(size="30")
											v-card-text.pa-0.caption v.{{ player.Version }}
								v-list-item-content.pl-5
									v-list-item-title( :class="(index < 3) && 'title'") {{player.Username}}
									v-list-item-subtitle {{player.Games}} {{ $t('leadGames') }}
								v-list-item-action.pr-3
									v-list-item-subtitle {{player.scoreString()}} {{ $t('leadWealth') }}
								v-list-item-action.pr-3
									span(:class="(index < 3) && 'title'") {{player.Wg}}
										v-icon.orange--text.text--lighten-2(class="ml-1") bubble_chart
							v-divider
</template>

<script>
import { searchBots } from '@/services/Search'

export default {
  name: 'Leaderboard',
  data: () => ({
    players: []
  }),
  created() {
    this.getLeaders()
  },
  methods: {
    async getLeaders() {
      const sort = [{ Wg: { order: 'desc' } }]
      searchBots(sort, 1, 100, null).then(leaders => {
        console.log('start search')
        this.players = leaders
      })
    }
  }
}
</script>
<style>
.leaderboard__card {
  margin-top: -350px;
}
</style>
