export const state = () => ({
  user: null
})

export const getters = {
  getUser: state => state.user
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  }
}
