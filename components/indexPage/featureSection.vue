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
									.headline.brown--text.text-xs-left.px-3 Learn
								v-card-text.subheading
									| Always wanted to learn coding but didn’t know what to start with? Start right here. This turn-based strategy game is the most engaging way to learn real code. PIck a language, read the rules link to
									| the rules and start learning right now.
				v-col(cols="11", lg="8", my="5")
					v-card.elevation-6.white
						v-row.align-center.justify-center.pa-3
							v-col.pa-2(cols="4")
								v-img.elevation-6.rounded(src='/img/ant_engineer_red.svg', aspect-ratio='1', max-width='100%', contain)
							v-col(cols="12", sm="8")
								v-card-title
									.headline.brown--text.text-xs-left.px-3 Practice
								v-card-text.subheading
									| Keep practicing and improving your coding skills by playing this game. This game is a great way to advance your programming skills while having fun and getting noticed. Master your current language of
									| choice; or expand your understanding of a new one. By completing the levels you get trophies and certificates which will benefit you not only in the game but in real life.
				v-col(cols="11", lg="8", my="5")
					v-card.elevation-6.white
						v-row.align-center.justify-center.pa-3
							v-col.pa-2(cols="4")
								v-img.elevation-6.rounded(src='/img/ant_racing.svg', aspect-ratio='1', max-width='100%', contain)
							v-col(cols="12", sm="8")
								v-card-title
									.headline.brown--text.text-xs-left.px-3 Compete
								v-card-text.subheading
									| Demonstrate your skills by competing with other developers in your language of choice. This platform allows you to battle not just against other software engineers around the world, but also against
									| bots written in different languages on the same map and on your own time. Demonstrate to everyone that your strategy is superior, your code is the most efficient and has no errors. Climb the leaderboard,
									| improving your strategy. Let your bot dominate the tournaments.				
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
.feature-section__layout {
	position: relative;
}

.feature-section__layout:before {
	content: "";
	display: block;
	position: absolute;
	top: -80px;
	right: -25%;
	width: 100%;
	height: 300px;
	background-color: #FAFAFA;
	border-radius: 100%;
}

.feature-section__layout:after {
	content: "";
	display: block;
	position: absolute;
	top: -90px;
	left: -20%;
	width: 100%;
	height: 300px;
	background: #FAFAFA;
	border-radius: 100%;
	z-index: -1;
}
</style>