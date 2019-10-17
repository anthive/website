<template lang="pug">
	.user-info-full.elevation-1
		v-card(:to="{ path: '/user/?username=' + username }")
			v-row.px-3
				v-col.pa-0(cols="7")
					.d-flex
						v-avatar(size="100" tile)
							v-img(:src="us.photoUrl(username, 100)" class="grey lighten-4")
								v-row.align-end
									v-col.pa-0
										v-avatar(size="30" tile)
											v-img(:src="us.langUrl(lang)")
									v-col.pa-0
										v-avatar.grey.lighten-4(size="30" tile)
											span v.{{ version }}
						v-avatar(size="100" tile)
							v-img(:src="us.hiveUrl(skin, true)")
								v-row.align-end.justify-center
									v-col.pa-0
										v-avatar(size="70" tile)
											v-img(:src="us.antUrl(skin, true)")
	
					v-card-text.py-2.mx-auto.text-center.font-weight-bold {{ username }}

				v-col.pa-1.text-left(cols="5")
					v-card-text.pt-0.pb-0.pl-8.grey--text.text--darken-2.caption.text-xs-center Bot info
					v-card-text.py-0.caption
						span.user-info-full__meta-item-title.mr-n1 Span:
						span Y{{ span[0] }}, X{{ span[1] }}
					v-card-text.py-0.caption
						span.user-info-full__meta-item-title Ticks:
						span {{ stats.Age }}
					v-card-text.py-0.caption
						span.user-info-full__meta-item-title Ants:
						span {{ stats.Ants }}
					v-card-text.py-0.caption
						span.user-info-full__meta-item-title HiveSize:
						span {{ stats.Hive }}
					v-card-text.py-0.caption
						span.user-info-full__meta-item-title Errors:
						span {{ stats.Errors }}
					v-card-text.py-0.caption
						span.user-info-full__meta-item-title Earned:
						span.font-weight-bold {{ score }}
</template>

<script>
import userService from "@/services/User";

export default {
	name: "usesrInfo",
	props: {
		username: String,
		lang: String,
		version: String,
		skin: Number,
		score: Number,
		span: Array,
		stats: Object
	},
	data: () => ({
		us: userService,
	}),
	created() {
	},
};
</script>

<style>
	.user-info-full {
		display: inline-block;
		border-radius: 5px;
		overflow: hidden;
	}

	.user-info-full__meta-item-title {
		display: inline-block;
		width: 53px;
		margin-right: 5px;
	}
</style>
