<template lang="pug">
	section.video_bg.my-12
		v-row.video_filter.align-center.justify-space-around
			v-col(cols="11", lg='3')
				v-card.py-3.transparent(@click='dialog = !dialog', style='cursor: pointer;')
					v-img(src='/img/play_button.png', style='margin: 0 auto;', aspect-ratio='1', max-width='128px', contain='')
				.text-xs-center
					v-dialog(v-model='dialog', width='70%')
						v-card
							iframe(width='100%', height='500', src='https://www.youtube.com/embed/8CKeXZQdKKU', frameborder='0', allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture', allowfullscreen)
			v-col(cols="11", lg='6')
				v-card.pa-3.transparent(flat)
					v-card-title
						.headline.brown--text.text-xs-left.px-2 Get Started!
					v-card-text.subheading
						p This is a turn-based strategy game for your Bot.
						p Compute, contemplate and plan each step of your ants. Send commands to your ants in order for them to collect food, bring it to your hive, and to grow your colony.
						p A player with the biggest colony and least errors wins the game. To start the game please follow three steps below.
						p For detailed rules please visit link
					v-btn.ma-3(to='/rules/', color='brown white--text') Rules
</template>

<script>
export default {
	data: () => ({
		dialog: false
	}),
	mounted() {
	},
	components: {
	}
}
</script>

<style>
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