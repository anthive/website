<template  lang="pug">
	v-app-bar( hide-on-scroll app fixed :clipped-left='$vuetify.breakpoint.lgAndUp')
		v-menu.hidden-md-and-up(offset-y transition="scale-transition")
			template(v-slot:activator="{ on }")
				v-app-bar-nav-icon.hidden-md-and-up(v-on="on")
			v-list.hidden-md-and-up.pa-2
				v-list-item(:to="localePath('games')")
					v-list-item-icon
						v-icon videogame_asset
					v-list-item-content
						v-list-item-title {{ $t('games') }}
				v-list-item(:to="localePath('leaderboard')")
					v-list-item-icon
						v-icon poll
					v-list-item-content
						v-list-item-title {{ $t('leaderboard') }}
				v-list-item(:to="localePath('rules')")
					v-list-item-icon
						v-icon import_contacts
					v-list-item-content
						v-list-item-title {{ $t('rules') }}
				v-list-item.green--text(href="https://profile.anthive.io/login/")
					v-list-item-icon
						v-icon.green--text person
					v-list-item-content
						v-list-item-title {{ $t('login') }}
		v-toolbar-title
			router-link(:to="localePath('index')") 
				Logo
		v-spacer
		v-toolbar-items.hidden-sm-and-down.mr-2
			v-btn(:to="localePath('sandbox')" text) {{ "sandbox" }}
			v-btn(:to="localePath('games')" text) {{ $t('games') }}
			v-btn(:to="localePath('leaderboard')" text) {{ $t('leaderboard') }}
			v-btn(:to="localePath('rules')" text) {{ $t('rules') }}
			v-btn(href="https://profile.anthive.io/login/" class="green darken-2 white--text" text) {{ $t('login') }}
			v-btn(:to="switchLocalePath('en')" text) {{ $t('en') }}
			v-btn(:to="switchLocalePath('ru')" text) {{ $t('ru') }}
</template>

<script>
import Logo from '@/components/logo'

export default {
  name: 'defaultHeader',
  data: () => ({}),
  mounted() {},
  components: {
    Logo
  }
}
</script>

<style>
a {
  text-decoration: none;
}
</style>
