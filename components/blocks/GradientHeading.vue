<!--
GradientHeading
-->

<template lang="pug">
.GradientHeading.relative.text-center

  ResponsiveMedia(
    v-if="block.imageBackground || block.videoBackground"
    :image="block.imageBackground"
    :video="block.videoBackground"
    :fill="true"
    background="cover"
  )

  .content-wide.h-gutter.relative.pb-10.md_pb-16.w-full
    h2.h0
      div(
        v-if="plainHeading"
        v-for="(line, index) in plainHeading"
        v-html="line"
      )
      div.bg-clip-text.text-transparent.bg-gradient-to-r.from-orange.via-pink.to-purple(
        v-if="gradientHeading"
        v-for="(line, index) in gradientHeading"
        v-html="line"
      )

</template>

<script>
import get from 'lodash.get'

import ResponsiveMedia from '~/components/shared/ResponsiveMedia'

export default {
  name: 'GradientHeading',

  components: { ResponsiveMedia },

  props: {
    block: {
      type: Object,
      required: true
    }
  },

  computed: {
    plainHeading() {
      const heading = get(this, 'block.headingPlain')
      if (!heading) return null

      return heading.split('\n')
    },

    gradientHeading() {
      const heading = get(this, 'block.headingGradient')
      if (!heading) return null

      return heading.split('\n')
    }
  }
}
</script>

<style lang="stylus" scoped>
.GradientHeading
  aspect-ratio 1.5/1, true

  @media(max-width tablet)
    aspect-ratio .7/1, true
</style>
