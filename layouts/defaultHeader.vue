<template  lang="pug">
	v-app-bar( hide-on-scroll app fixed)
		v-menu.hidden-md-and-up(offset-y transition="scale-transition")
			template(v-slot:activator="{ on }")
				v-app-bar-nav-icon.hidden-md-and-up(v-on="on")
			v-list.hidden-md-and-up.pa-2
				v-list-item(to="/games/")
					v-list-item-icon
						v-icon videogame_asset
					v-list-item-content
						v-list-item-title Games
				v-list-item(to="/leaderboard/")
					v-list-item-icon
						v-icon poll
					v-list-item-content
						v-list-item-title Leaderboard
				v-list-item(to="/rules/")
					v-list-item-icon
						v-icon import_contacts
					v-list-item-content
						v-list-item-title Rules
				v-list-item.green--text(href="https://profile.anthive.io/login/")
					v-list-item-icon
						v-icon.green--text person
					v-list-item-content
						v-list-item-title Login
		v-toolbar-title
			router-link(to="/") 
				Logo
		v-spacer
		v-toolbar-items.hidden-sm-and-down.mr-2
			v-btn(to="/games/" text) {{ $t('btnGames') }}
			v-btn(to="/leaderboard/" text) {{ $t('btnLeaderboard') }}
			v-btn(to="/rules/" text) {{ $t('btnRules') }}
			v-btn(href="https://profile.anthive.io/login/" class="green darken-2 white--text" text) {{ $t('btnLogin') }}
			v-btn(v-for="el in locales"
				:key="el.code"
				:class="{ active: (el.code === locale) }"
				@click="switchLanguage(el.code)") {{ el.name }}
				 
</template>

<script>
import Logo from '@/components/logo';

export default {
  name: 'defaultHeader',
  data: () => ({
  }),
  mounted() {
  },
  components: {
  	Logo
  },
  computed: {
      locales() { return this.$store.state.locales },
      locale() { return this.$store.state.locale }
    },
    methods: {
      switchLanguage (localeCode) {
        document.cookie = `locale=${localeCode}`;
        location.reload();
      }
    }
}
</script>

<style>
	a{ 
		text-decoration: none;
	} 
</style>
