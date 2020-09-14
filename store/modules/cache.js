// import { make } from 'vuex-pathify'

const CACHE_TIMEOUT = 60 * 30 * 1000

export const state = () => ({
  pages: {}
})

export const getters = {
  pages: ({ pages }) => (path) => {
    // If we have a record for the requeested page
    if (Object.prototype.hasOwnProperty.call(pages, path)) {
      // Only send the record back if we're under the expiration window
      const page = pages[path]
      if (page.expires > Date.now()) return page.data
    }
    return null
  }
}

export const mutations = {
  save(state, { path, page, expires }) {
    return (state.pages[path] = { data: page, expires })
  }
}

export const actions = {
  save: ({ commit }, payload) => {
    // Set expiry for this page's cache
    const timestamp = Date.now() + CACHE_TIMEOUT // 30 minutes
    payload.expires = timestamp

    return commit('save', payload)
  }
}

export default {
  namespaced: true,
  actions,
  getters,
  state,
  mutations
}
