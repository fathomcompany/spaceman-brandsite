import { getEntries } from 'bukwild-contentful-utils'

export const state = () => ({
  settings: {}
})

export const getters = {
  settings({ settings }) {
    return settings.settings
  }
}

export const actions = {
  async fetch({ commit }) {
    const { items } = await getEntries('settings', { include: 1 })
    commit('save', items[0])
  }
}

export const mutations = {
  save(state, settings) {
    state.settings = settings
  }
}

export default {
  namespaced: true,
  mutations,
  actions,
  state
}
