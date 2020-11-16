<template lang="pug">
	.user-info-full.elevation-1
		v-card(:to="{ path: '/user/?username=' + us.Username }")
			v-row.px-3
				v-col.pa-0(cols="7")
					.d-flex
						v-avatar(size="100" tile)
							v-img(:src="us.photoUrl(100)" class="grey lighten-4")
								v-row.align-end
									v-col.pa-0
										v-avatar(size="30" tile)
											v-img(:src="us.langUrl(us.Lang)")
									v-col.pa-0
										v-avatar.grey.lighten-4(size="30" tile)
											span v.{{ us.Version }}
						v-avatar(size="100" tile)
							v-img(:src="us.hiveUrl(true)")
								v-row.align-end.justify-center
									v-col.pa-0
										v-avatar(size="70" tile)
											v-img(:src="us.antUrl(true)")
	
					v-card-text.py-2.mx-auto.text-center.font-weight-bold {{ us.Username }}

				v-col.pa-1.text-left(cols="5")
					v-card-text.pt-0.pb-0.pl-8.grey--text.text--darken-2.caption.text-xs-center {{ $t('infoBotInfo') }}
					v-card-text.py-0.caption
						span.user-info-full__meta-item-title.mr-n1 {{ $t('infoSpan') }}
						span Y{{ player.Y }}, X{{ player.X }}
					v-card-text.py-0.caption
						span.user-info-full__meta-item-title {{ $t('infoTicks') }}
						span {{ player.Stats.Age }}
					v-card-text.py-0.caption
						span.user-info-full__meta-item-title {{ $t('infoAnts') }}
						span {{ player.Stats.Ants }}
					v-card-text.py-0.caption
						span.user-info-full__meta-item-title {{ $t('infoHiveSize') }}
						span {{ player.Stats.Hive }}
					v-card-text.py-0.caption
						span.user-info-full__meta-item-title {{ $t('infoErrors') }}
						span {{ player.Stats.Errors }}
					v-card-text.py-0.caption
						span.user-info-full__meta-item-title {{ $t('infoEarned') }}
						span.font-weight-bold {{ player.Wealth }}
</template>

<script>
import { User } from '@/services/User'

export default {
  name: 'usesrInfo',
  props: {
    player: Object
  },
  data: () => ({
    us: null
  }),
  created() {
    this.us = new User()
    this.us.initUser(this.player)
  }
}
</script>

<style>
.user-info-full {
  display: inline-block;
  overflow: hidden;
}

.user-info-full__meta-item-title {
  display: inline-block;
  width: 53px;
  margin-right: 5px;
}
</style>
