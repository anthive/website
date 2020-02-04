<template lang="pug">
	.user-info-full.elevation-1
		v-card.user-info-full__card.pa-2(@click="handlerClickChip" color="#D8D8D8")
			v-row.px-3
				v-col.pa-0(cols="7")
					.d-flex
						v-avatar(size="60")
							v-img(:src="us.photoUrl(100)" class="grey lighten-4")
						v-avatar.user-info-full__ant-img.ml-n4(size="32")
							v-img(:src="us.antUrl(true)")
						.d-flex.flex-wrap
							v-card-text.pa-1.mx-auto.text-left.font-weight-bold.subtitle-1 {{ us.Username }}
							.d-flex.mt-n3.mb-n1
								v-card-text.pa-1.caption
									span.text-left.user-info-full__meta-item-title {{ $t('infoEarned') }} {{ player.Wealth }}
								v-col.pa-1
									v-avatar(size="30" color="white")
										span.caption.font-weight-bold v.{{ us.Version }}
								v-col.pa-1
									v-avatar(size="30")
										v-img(:src="us.langUrl(us.Lang)")
		v-expand-transition
			v-card.transition-fast-in-fast-out(v-if="showBotInfo" :to="{ path: '/user/?username=' + us.Username }" color="#EEEEEE")
				.px-5.pb-6.pt-4.subtitle-1.font-weight-medium {{ $t('infoBotInfo') }}
					.d-flex
						v-col.col-6.pa-0
							v-card-text.pa-0.body-2
								span.mr-1 {{ $t('infoSpan') }}
								span Y{{ player.Y }}, X{{ player.X }}
							v-card-text.pa-0.body-2
								span.mr-1 {{ $t('infoTicks') }}
								span {{ player.Stats.Age }}
							v-card-text.pa-0.body-2
								span.mr-1 {{ $t('infoAnts') }}
								span {{ player.Stats.Ants }}
						v-col.col-6.pa-0
							v-card-text.pa-0.body-2
								span.mr-1 {{ $t('infoHiveSize') }}
								span {{ player.Stats.Hive }}
							v-card-text.pa-0.body-2
								span.mr-1 {{ $t('infoErrors') }}
								span {{ player.Stats.Errors }}
							v-card-text.pa-0.body-2
								span.mr-1 {{ $t('infoEarned') }}
								span {{ player.Wealth }}
</template>

<script>
import { User } from '@/services/User'

export default {
  name: 'usesrInfo',
  props: {
    player: Object,
    locale: String
  },
  data: () => ({
    us: null,
    showBotInfo: false
  }),
  methods: {
    handlerClickChip() {
      if (this.locale) {
        this.$router.push('/user/?username=' + this.us.Username)
        return
      }
      this.showBotInfo = !this.showBotInfo
    }
  },
  created() {
    this.us = new User()
    this.us.initUser(this.player)
  }
}
</script>

<style>
.user-info-full {
  display: inline-block;
  border-radius: 38px;
  overflow: hidden;
  width: 279px;
}

.user-info-full__ant-img {
  background-color: white;
  border: 3px solid #d8d8d8;
  box-sizing: border-box;
}

.user-info-full__meta-item-title {
  display: inline-block;
  width: 90px;
  margin-right: 5px;
  font-size: 14px;
  padding-top: 6px;
}
</style>
