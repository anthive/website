<template lang="pug">
	.user-info-full.elevation-1.d-flex
		v-card.user-info-full__card.pa-2(:to="{ path: '/user/?username=' + us.Username }" color="#262626" tile)
			v-row.px-3
				p.user-info-full__number {{number}}
				v-col.pa-0(cols="7")
					.d-flex
						v-avatar.py-4.user-info-full__avatar(size="60")
							v-img(:src="us.photoUrl(100)" class="grey lighten-4")
						v-avatar.user-info-full__ant-img.ml-n4(size="32")
							v-img(:src="us.antUrl(true)") 
							
		v-expand-transition
			v-card.user-info-full__statistic(color="#1a1a1a" tile :class="{'opened': isOpened}")
				.user-info-full__statistic-value.pa-4.pb-1.mx-auto.text-left.font-weight-bold.subtitle-1 {{ us.Username }}
				.pa-4.pt-1.tb-1.subtitle-1.font-weight-medium
					.d-flex.user-info-full__statistic-container
						v-col.col-4.pa-0
							v-card-text.pa-0.body-2
								span.user-info-full__statistic-key.mr-1 {{ $t('infoSpan') }}
								span.user-info-full__statistic-value Y{{ player.Y }}, X{{ player.X }}
							v-card-text.pa-0.body-2
								span.user-info-full__statistic-key.mr-1 {{ $t('infoTicks') }}
								span.user-info-full__statistic-value {{ player.Stats.Age }}
						v-col.col-4.pa-0
							v-card-text.pa-0.body-2
								span.user-info-full__statistic-key.mr-1 {{ $t('infoAnts') }}
								span.user-info-full__statistic-value {{ player.Stats.Ants }}
							v-card-text.pa-0.body-2
								span.user-info-full__statistic-key.mr-1 {{ $t('infoHiveSize') }}
								span.user-info-full__statistic-value {{ player.Stats.Hive }}
						v-col.col-4.pa-0
							v-card-text.pa-0.body-2
								span.user-info-full__statistic-key.mr-1 {{ $t('infoErrors') }}
								span.user-info-full__statistic-value {{ player.Stats.Errors }}
							v-card-text.pa-0.body-2
								span.user-info-full__statistic-key.mr-1 {{ $t('infoEarned') }}
								span.user-info-full__statistic-value {{ player.Wealth }}
					.user-info-full__statistic-info-badges
						v-col.pa-1
							v-avatar(size="30" color="white")
								span.caption.font-weight-bold v.{{ us.Version }}
						v-col.pa-1
							v-avatar(size="30")
								v-img(:src="us.langUrl(us.Lang)")
</template>

<script>
import { User } from '@/services/User'

export default {
  name: 'usersInfo',
  props: {
    player: Object,
    locale: String,
    number: Number,
    isOpened: Boolean
  },
  data: () => ({
    us: null,
    showBotInfo: false
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
  border-bottom: 2px solid #404040;
}

@media screen and (max-width: 997px) {
  .user-info-full {
    flex-direction: column;
  }
}

.user-info-full__number {
  color: #555555;
}

.user-info-full__avatar {
  box-sizing: content-box;
}

.user-info-full__statistic.opened {
  display: block;
  width: 460px;
}

@media screen and (max-width: 997px) {
  .user-info-full__statistic.opened {
    width: 297px;
  }
}

.user-info-full__statistic {
  display: none;
  width: 0;
}

@media screen and (max-width: 997px) {
  .user-info-full__statistic-container {
    flex-direction: column;
  }
}

.user-info-full__statistic-key {
  color: #75715e;
}

.user-info-full__statistic-value {
  color: #cccccc;
}
.user-info-full__statistic-info-badges {
  position: absolute;
  top: 10px;
  right: 5px;
  display: flex;
}

.user-info-full__ant-img {
  background-color: white;
  border: 3px solid #262626;
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
