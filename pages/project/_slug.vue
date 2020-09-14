<template lang="pug">
.project(
  :class="[`project-${project.slug}`]"
)

  Blocks(:blocks="blocks")

</template>

<script>
import get from 'lodash.get'
import { parse, stringify } from 'flatted/cjs'
import { notFound } from '~/utils/errors'
import { makeMeta } from '~/utils/meta'

import Blocks from '~/components/Blocks'

export default {
  components: { Blocks },

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

    let path = params.slug
    path = path.trim()
    path = path.replace(/\/$/, '') // strip trailing slash if necessary

    let project = store.get('cache/pages', path)
    if (project) return project

    project = await app.$contentful.getEntry('project', {
      'fields.slug': path,
      include: 4
    })

    if (!project) return error(notFound)

    const projectData = {
      projectJson: stringify(project)
    }

    // Save project to the cache
    store.dispatch('cache/save', { path, page: projectData })

    return projectData
  },

  computed: {
    project() {
      return parse(this.projectJson)
    },

    relatedProjects() {
      return get(this.project, 'relatedProjects')
    },

    blocks() {
      return this.project.blocks
    }
  },

  head() {
    return makeMeta(this.project.meta, {
      title: this.project.title,
      canonical: `${process.env.BASE_URL}/project/${this.project.slug}/`
    })
  }
}
</script>

<style lang="stylus"></style>
