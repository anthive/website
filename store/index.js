export const state = () => ({
  isUserLogged: false
})

export const getters = {
  getUserAuthStatus: state => state.isUserLogged
}

export const mutations = {
  setUserAuthStatus(state, boolean) {
    state.isUserLogged = boolean
  }
}
