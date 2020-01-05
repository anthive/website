<template lang="pug">
	section
		v-parallax(src='/img/home_bg.png', align='', height='300')
		v-row.justify-center
			v-col(cols="11", md="8")
				v-card.white.text-xs-left.pa-3.elevation-6.rules__card(flat='', tile='')
					v-card-title.font-weight-bold.mb-5 {{ $t('rules') }}
					v-card-text.white-space {{ $t('rulesText') }}
</template>

<style>
  .rules__card {
	margin-top: -178px;
  }

  .white-space {
	  white-space: pre-line;
  }
</style>
