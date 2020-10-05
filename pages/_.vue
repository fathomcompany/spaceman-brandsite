<template lang="pug">
.page
  Blocks(:blocks='blocks')

  ScrollDownArrow
</template>

<script>
import { parse, stringify } from 'flatted/cjs'
import get from 'lodash.get'
import { notFound } from '~/utils/errors'
import { makeMeta } from '~/utils/meta'

import ScrollDownArrow from '~/components/shared/ScrollDownArrow'
import Blocks from '~/components/Blocks'

let COMING_FROM_PROJECT = false

export default {
  components: {
    Blocks,
    ScrollDownArrow
  },

  transition: {
    name: 'fade',
    mode: 'out-in'
  },

  beforeRouteEnter(to, from, next) {
    if (from.path.includes('/project/')) COMING_FROM_PROJECT = true
    next()
  },

  async asyncData(context) {
    const { params, error, app, store } = context

    // Get settings, if we're in SPA mode
    if (process.env.NUXT_MODE === 'spa') {
      await store.dispatch('settings/fetch')
    }

    let path = params.pathMatch || ''
    path = path.trim()
    path = path.replace(/\/$/, '') // strip trailing slash if necessary

    // Default to home page
    if (!path) path = '/'

    let page = store.get('cache/pages', path)
    if (page) return page

    page = await app.$contentful.getEntry('homePage', {
      'fields.path': path,
      include: 4,
      limit: 1
    })

    if (!page) return error(notFound)

    const pageData = {
      pageJson: stringify(page)
    }

    // Save page to the cache
    store.dispatch('cache/save', { path, page: pageData })

    return pageData
  },

  computed: {
    page() {
      if (!this.pageJson) return null
      return parse(this.pageJson)
    },

    blocks() {
      return get(this.page, 'blocks.content', [])
    }
  },

  head() {
    return makeMeta(this.page.seo, {
      title: this.page.title,
      canonical: `${process.env.BASE_URL}${
        this.page.path === '/' ? '' : `/${this.page.path}/`
      }`
    })
  },

  mounted() {
    if (!window || typeof window === 'undefined') return

    if (!COMING_FROM_PROJECT) return

    COMING_FROM_PROJECT = false

    const sliderBlocks = document.getElementsByClassName('Slider')

    if (!sliderBlocks || sliderBlocks.length < 1) return

    try {
      setTimeout(() => {
        window.scroll(0, sliderBlocks[0].offsetTop)
      }, 200)
    } catch (e) {}
  }
}
</script>

<style lang="stylus"></style>
