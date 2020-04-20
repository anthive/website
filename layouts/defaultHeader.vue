<template  lang="pug">
	v-app-bar( app fixed)
		v-toolbar-title
			router-link(:to="localePath('index')") 
				Logo
		v-spacer
		v-menu.hidden-md-and-up(offset-y transition="scale-transition")
			template(v-slot:activator="{ on }")
				// TODO: open menu
				AntHiveBtn.hidden-md-and-up(v-on="on") menu
					v-icon keyboard_arrow_right
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
		
		.hidden-sm-and-down.mr-6
			AntHiveBtn(:to="localePath('games')") {{ $t('games') }}
			AntHiveBtn(:to="localePath('leaderboard')") {{ $t('leaderboard') }}
			AntHiveBtn(:to="localePath('rules')") {{ $t('rules') }}
			AntHiveBtn(href="https://profile.anthive.io/login/") {{ $t('login') }}
			AntHiveBtn(:to="switchLocalePath('en')") {{ $t('en') }}
			AntHiveBtn(:to="switchLocalePath('ru')") {{ $t('ru') }}
			AntHiveBtn(:to="localePath('sandbox')" fill) {{ "sandbox" }}

</template>

<script>
import Logo from '@/components/logo'
import AntHiveBtn from '@/components/AntHiveBtn'

export default {
  name: 'defaultHeader',
  data: () => ({}),
  mounted() {},
  components: {
    Logo,
    AntHiveBtn
  }
}
</script>

<style>
a {
  text-decoration: none;
}
</style>
