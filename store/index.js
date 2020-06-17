import Vuex from 'vuex'
import rules from '@/assets/rules/rules'

const store = () => {
  return new Vuex.Store({
    getters: {
      getRules: () => rules
    }
  })
}

export default store
