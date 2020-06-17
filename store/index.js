import Vuex from 'vuex'
import rules from '@/assets/rules/ruru'

const store = () => {
  return new Vuex.Store({
    state: {
      currentRule: rules[0].rules[0]
    },
    getters: {
      getRules: () => rules,
      getCurrentRule: state => state.currentRule
    },
    mutations: {
      SET_CURRENT_RULE(state, rule) {
        state.currentRule = rule
      }
    },
    actions: {
      setCurrentRule({ commit }, rule) {
        commit('SET_CURRENT_RULE', rule)
      }
    }
  })
}

export default store
