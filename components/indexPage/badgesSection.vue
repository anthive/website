<template lang="pug">
	section.my-12
		v-row.align-center.justify-space-around.ma-0.pa-0
			v-col(cols="12", lg="5")
				v-card.elevation-3.white.pa-2.pl-4.ant-card-scientist
					v-card-title.layout(primary-title)
						.headline.brown--text.text-xs-left.px-3 {{ $t('badgesTitle') }}
					v-card-text
						| {{ $t('badgesText1')}}
					v-card-text
						| {{ $t('badgesText2')}}
					v-card-text
						| {{ $t('badgesText3')}}
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