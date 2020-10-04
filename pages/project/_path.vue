<template lang="pug">
.project(:class='[`project-${project.path}`]')
  CloseButton

  Blocks(:blocks='blocks')
</template>

<script>
import get from 'lodash.get'
import { parse, stringify } from 'flatted/cjs'
import { notFound } from '~/utils/errors'
import { makeMeta } from '~/utils/meta'

import Blocks from '~/components/Blocks'
import CloseButton from '~/components/shared/CloseButton'

export default {
  components: { Blocks, CloseButton },

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

    let path = params.path
    path = path.trim()
    path = path.replace(/\/$/, '') // strip trailing slash if necessary

    let project = store.get('cache/pages', path)
    if (project) return project

    project = await app.$contentful.getEntry('project', {
      'fields.path': path,
      include: 4,
      limit: 1
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
      return get(this.project, 'blocks.content', [])
    }
  },

  head() {
    return makeMeta(this.project.seo, {
      title: this.project.title,
      canonical: `${process.env.BASE_URL}/project/${this.project.path}/`
    })
  }
}
</script>

<style lang="stylus"></style>
