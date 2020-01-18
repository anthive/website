<template lang="pug">
	.d-inline-block
		.user-info.grey.lighten-4.elevation-3.d-flex
			//- v-img.user-info__avatar.d-inline-block.flex-grow-0(:src="us.photoUrl(username, 96)" width="48" height="48"  aspect-ratio="1" class="lighten-4")
			//- v-img.user-info__avatar-lang(:src="us.langUrl(lang)"  width="48" height="48"  aspect-ratio="1"  class="lighten-2")
			//- .text-xs-center.user-info__skin(:style="'background: green url('+us.hiveUrl(skin)+');'")
				v-img.mx-auto(:src="us.antUrl(skin)" width="20")
				span.black--text.text-center.d-block.user-info__version v.{{ version }}
			.text-center.flex-grow-1.pt-3.px-5
				a.user-info__link.black--text.font-weight-bold(:href="'/user/?username='+username") {{ username }}
			.orange.lighten-5.pt-2
				span.orange--text.title.font-weight-bold.mx-3 {{ score }}
					v-icon.orange--text.text--lighten-1(size="20") bubble_chart
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
		score: Number
	},
	data: () => ({
		us: userService
	}),
	created() {
	},
	methods: {
	}
};
</script>

<style scoped lang="scss">
	.user-info {
		height: 48px;
		max-width: 300px;
		position: relative;
		border-radius: 8px;
		overflow: hidden;
		cursor: default;
		z-index: 3;

		&__avatar{
			border-radius: 0;
			z-index: 2;

			&:hover + .user-info__avatar-lang{
				margin-left: 47px;
			}
			&:hover  ~ .user-info__skin{
				margin-left: 94px;
			}
		}
		&__avatar-lang{
			position: absolute;
			z-index: 1;
			transition: all ease .5s;
		}
		&__skin {
			position: absolute;
			width: 48px;
			z-index: 1;
			transition: all ease .5s;
		}
		&__version {
			background: rgba(255, 255, 255, .8);
		}
		&__link:hover {
			text-decoration: underline;
		}
	}
</style>
