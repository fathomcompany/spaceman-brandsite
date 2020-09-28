<template lang="pug">
.page
  Blocks(:blocks='blocks')
</template>

<script>
import { parse, stringify } from 'flatted/cjs'
import get from 'lodash.get'
import { notFound } from '~/utils/errors'
import { makeMeta } from '~/utils/meta'

import Blocks from '~/components/Blocks'

export default {
  components: {
    Blocks
  },

  transition: {
    name: 'fade',
    mode: 'out-in'
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
        this.page.slug === 'homepage' ? '' : `/${this.page.slug}/`
      }`
    })
  }
}
</script>

<style lang="stylus"></style>
