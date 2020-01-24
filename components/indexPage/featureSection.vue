<template lang="pug">
	section.feature-section
		v-parallax(src='/img/leaderboard_bg.png', height='100%')
			v-row.feature-section__layout.my-5.justify-center
				v-col(cols="11", lg="8", my="5")
					v-card.elevation-6.white
						v-row.align-center.justify-center.pa-3
							v-col.pa-2(cols="4")
								v-img.elevation-6.rounded(src='/img/ant_ml.svg', aspect-ratio='1', max-width='100%', contain)
							v-col(cols="12", sm="8")
								v-card-title
									.headline.brown--text.text-xs-left.px-3 {{ $t('feature1Title') }}
								v-card-text.subheading
									| {{ $t('feature1Text') }}
				v-col(cols="11", lg="8", my="5")
					v-card.elevation-6.white
						v-row.align-center.justify-center.pa-3
							v-col.pa-2(cols="4")
								v-img.elevation-6.rounded(src='/img/ant_engineer_red.svg', aspect-ratio='1', max-width='100%', contain)
							v-col(cols="12", sm="8")
								v-card-title
									.headline.brown--text.text-xs-left.px-3 {{ $t('feature2Title') }}
								v-card-text.subheading
									| {{ $t('feature2Text') }}
				v-col(cols="11", lg="8", my="5")
					v-card.elevation-6.white
						v-row.align-center.justify-center.pa-3
							v-col.pa-2(cols="4")
								v-img.elevation-6.rounded(src='/img/ant_racing.svg', aspect-ratio='1', max-width='100%', contain)
							v-col(cols="12", sm="8")
								v-card-title
									.headline.brown--text.text-xs-left.px-3 {{ $t('feature3Title') }}
								v-card-text.subheading
									| {{ $t('feature3Text') }}				
</template>

<script>
export default {
  data: () => ({}),
  mounted() {},
  components: {}
}
</script>

<style>
.feature-section__layout {
  position: relative;
}

.feature-section__layout:before {
  content: '';
  display: block;
  position: absolute;
  top: -80px;
  right: -25%;
  width: 100%;
  height: 300px;
  background-color: #fafafa;
  border-radius: 100%;
}

.feature-section__layout:after {
  content: '';
  display: block;
  position: absolute;
  top: -90px;
  left: -20%;
  width: 100%;
  height: 300px;
  background: #fafafa;
  border-radius: 100%;
  z-index: -1;
}
</style>
