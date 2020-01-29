<template lang="pug">
	section.video_bg.my-12
		v-row.video_filter.align-center.justify-space-around
			v-col(cols="11", lg='3')
				v-card.video-preview.transparent(@click='dialog = !dialog', style='cursor: pointer;')
					v-img(src='/img/play_button.png', style='margin: 0 auto; filter: invert(1);', aspect-ratio='1', max-width='128px', contain='')
				.text-xs-center
					v-dialog(v-model='dialog', width='47%')
						v-card
							iframe(v-if="dialog", width='100%', height='500', src='https://www.youtube.com/embed/RP8t8O-O2gY', frameborder='0', allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture', allowfullscreen)
			v-col(cols="11", lg='6')
				v-card.pa-3.transparent(flat)
					v-card-title
						.headline.brown--text.text-xs-left.px-2 {{ $t('videoTitle') }}
					v-card-text.subheading
						p {{ $t('videoText1') }}
						p {{ $t('videoText2') }}
						p {{ $t('videoText3') }}
						p {{ $t('videoText4') }}
					v-btn.ma-3(:to="localePath('rules')", color='brown white--text') {{ $t('rules') }}
</template>

<script>
export default {
  data: () => ({
    dialog: false
  }),
  mounted() {},
  components: {}
}
</script>

<style>
.video-preview {
  background-image: url(/img/video-preview.jpg);
  background-position: center center;
  padding: 100px 0;
}
.video_bg {
  background-image: url(/img/howto_bg.png);
  background-size: 90% 90%;
}

.video_filter {
  min-height: 400px;
  height: 100%;
  width: 100%;
  background: rgba(250, 250, 250, 0.95);
  background: -moz-radial-gradient(
    center,
    ellipse cover,
    rgba(250, 250, 250, 0.95) 0%,
    rgba(250, 250, 250, 1) 53%,
    rgba(250, 250, 250, 1) 100%
  );
  background: -webkit-gradient(
    radial,
    center center,
    0px,
    center center,
    100%,
    color-stop(0%, rgba(250, 250, 250, 0.95)),
    color-stop(53%, rgba(250, 250, 250, 1)),
    color-stop(100%, rgba(250, 250, 250, 1))
  );
  background: -webkit-radial-gradient(
    center,
    ellipse cover,
    rgba(250, 250, 250, 0.95) 0%,
    rgba(250, 250, 250, 1) 53%,
    rgba(250, 250, 250, 1) 100%
  );
  background: -o-radial-gradient(
    center,
    ellipse cover,
    rgba(250, 250, 250, 0.95) 0%,
    rgba(250, 250, 250, 1) 53%,
    rgba(250, 250, 250, 1) 100%
  );
  background: -ms-radial-gradient(
    center,
    ellipse cover,
    #fff351f2 0%,
    rgba(250, 250, 250, 1) 53%,
    rgba(250, 250, 250, 1) 100%
  );
  background: radial-gradient(
    ellipse at center,
    rgba(250, 250, 250, 0.95) 0%,
    rgba(250, 250, 250, 1) 53%,
    rgba(250, 250, 250, 1) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#fafafa', endColorstr='#fafafa', GradientType=1 );
}
</style>
