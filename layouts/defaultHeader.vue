<template  lang="pug">
	v-app-bar( hide-on-scroll app fixed color='#080808')
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
		v-toolbar-items.hidden-sm-and-down.mr-2.header-menu
			v-btn(:ripple='false' :to="localePath('sandbox')" text) {{ "sandbox" }}
			v-btn(:ripple='false' :to="localePath('games')" text) {{ $t('games') }}
			v-btn(:ripple='false' :to="localePath('leaderboard')" text) {{ $t('leaderboard') }}
			v-btn(:ripple='false' :to="localePath('rules')" text) {{ $t('rules') }}
			v-btn.header-menu__login-btn(:ripple='false' href="https://profile.anthive.io/login/" text) {{ $t('login') }}
			v-btn(:ripple='false' :to="switchLocalePath('en')" text) {{ $t('en') }}
			v-btn(:ripple='false' :to="switchLocalePath('ru')" text) {{ $t('ru') }}
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
.header-menu .v-btn--active .v-btn__content {
  border-bottom: 2px solid #db8f39;
}
.header-menu .v-btn:hover:not(.v-btn--active) .v-btn__content {
  color: #db8f39;
  border-bottom: 2px solid #db8f39;
  margin-bottom: -2px;
}
.header-menu .header-menu__login-btn .v-btn__content {
  text-transform: uppercase;
  color: #db8f39;
  font-weight: bold;
}
</style>
<style lang="scss" scoped>
a {
  text-decoration: none;
}
.v-app-bar {
  border-bottom: 2px solid #262626 !important;
}
.header-menu {
  & .v-btn {
    color: #cccccc;
    text-transform: capitalize;
    font-size: 16px;
    padding: 0 !important;
    &--active {
      color: #db8f39;
    }
    &:before {
      background-color: inherit;
    }
    &::after {
      display: inline-block;
      content: '';
      border-radius: 0.375rem;
      height: 5px;
      width: 5px;
      background-color: #bdbdbd;
      margin: 0 15px;
    }
  }
}
</style>
