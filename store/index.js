// import Vuex from 'vuex'
import pathify from 'vuex-pathify'
import cache from './modules/cache'
import settings from './modules/settings'
import global from './modules/global'

export const plugins = [pathify.plugin]

export const modules = { settings, cache, global }

export const actions = {
  nuxtServerInit({ dispatch }) {
    return Promise.all[dispatch('settings/fetch')]
  }
}
