<template lang="pug">
	section.my-12
		v-row.align-center.justify-space-around.ma-0.pa-0
			v-col(cols="12", lg="5")
				v-card.elevation-3.white.pa-2.pl-4.ant-card-scientist
					v-card-title.layout(primary-title)
						.headline.brown--text.text-xs-left.px-3 Badges and Ranking
					v-card-text
						| Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sapien velit, sodales in elementum sed, facilisis suscipit massa.
					v-card-text
						| Maecenas efficitur lectus non ligula accumsan euismod in a quam. Vivamus finibus tincidunt tellus vitae aliquet. Suspendisse justo ipsum, pharetra non pretium ut, scelerisque ac mi.
					v-card-text
						| Pellentesque hendrerit sodales tortor, in faucibus diam tempus ac. Donec convallis fringilla mauris vitae tristique.
			v-col(cols="10", lg="3" sm="6", md="5")
				v-img(src='/img/badges_trinity.png', aspect-ratio='1', contain)
</template>

<script>
export default {
	data: () => ({
	}),
	mounted() {
	},
	components: {
	}
}
</script>

<style>

</style>