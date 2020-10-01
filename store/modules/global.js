export const state = () => ({
  introFinished: false
})

export const getters = {
  introFinished({ introFinished }) {
    return introFinished
  }
}

export const mutations = {
  SET_INTRO_FINISHED(state, isFinished) {
    state.introFinished = isFinished
  }
}
export default {
  namespaced: true,
  getters,
  state,
  mutations
}
