<template lang="pug">
	section
		v-parallax(src='/img/home_bg.png', height='500')
			v-row.justify-space-around.align-center
				v-col.pa-2(cols="12", sm="6", md="5", lg="4", xl="3")
					v-card.elevation-6.white.pa-3.mail(style='padding-left: 70px !important;', height='100%')
						//- move it to styles
						.headline.text-xs-left.px-0.brown--text.text--lighten-2 Subscribe
						v-card-text.body-1.text-xs-left.px-0.grey--text Stay in touch and get latest news first!
						v-btn(href='https://visitor.r20.constantcontact.com/d.jsp?llr=iei6rx6ab&p=oi&m=1131440677000&sit=hmwc8c9mb&f=c1095ec4-d2a5-4f31-85e6-9f5d16f7d72c', target='_blank', color='brown white--text darken-2 mx-0') Subscribe
				v-col.pa-2(cols="12", sm="6", md="5", lg="4", xl="3")
					v-card.elevation-6.white.pa-3.bug(style='padding-left: 70px !important;', height='100%')
						//- move it to styles
						.headline.text-xs-left.px-0.brown--text.text--lighten-2 Found an issue?
						v-card-text.body-1.text-xs-left.px-0.grey--text Tell us on our github repo and we wil fix it!
						v-btn(href='https://github.com/anthive/io/issues', color='brown white--text darken-2 mx-0') Report issue
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