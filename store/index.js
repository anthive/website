import Vuex from 'vuex'
import rulesEn from '@/assets/rules/rules-en'
import rulesRu from '@/assets/rules/rules-ru'

const store = () => {
  return new Vuex.Store({
    state: {
      currentLocale: ''
    },
    getters: {
      getRules: state => {
        if (state.currentLocale === 'en') return rulesEn
        return rulesRu
      }
    },
    mutations: {
      SET_CURRENT_LOCALE(state, locale) {
        state.currentLocale = locale
      }
    },
    actions: {
      setCurrentLocale({ commit }, locale) {
        commit('SET_CURRENT_LOCALE', locale)
      }
    }
  })
}

export default store
