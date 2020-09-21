<template lang="pug">
.page(
  style="margin-top: 80px;"
)
  HomeMarquee

  GradientHeading

  Blocks(:blocks="blocks")

</template>

<script>
import { parse, stringify } from 'flatted/cjs'
import get from 'lodash.get'
import { notFound } from '~/utils/errors'
import { makeMeta } from '~/utils/meta'

import Blocks from '~/components/Blocks'

import HomeMarquee from '~/components/blocks/HomeMarquee'
import GradientHeading from '~/components/blocks/GradientHeading'

export default {
  components: {
    Blocks,
    HomeMarquee,
    GradientHeading
  },

  transition: {
    name: 'fade',
    mode: 'out-in'
  },

  async asyncData(context) {
    const { error, app, store } = context

    // Get settings, if we're in SPA mode
    if (process.env.NUXT_MODE === 'spa') {
      await store.dispatch('settings/fetch')
    }

    const path = '/'

    let page = store.get('cache/pages', path)
    if (page) return page

    page = await app.$contentful.getEntry('homePage', {
      include: 4,
      limit: 1
    })

    // console.log(page)

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
