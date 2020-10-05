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
    h2.h0.heading-container
      div(
        v-if="plainHeading"
        v-for="(line, index) in plainHeading"
        v-html="line"
        v-in-viewport.once
      )
      div.bg-clip-text.text-transparent(
        v-if="gradientHeading"
        v-for="(line, index) in gradientHeading"
        v-html="line"
        v-in-viewport.once
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

<style lang="stylus">

@keyframes whoosh {
  0% { background-position-x: 0 }
  100% { background-position-x: 100% }
}

.GradientHeading
  aspect-ratio 1.5/1, true

  @media(max-width tablet)
    aspect-ratio .8/1, true

  .heading-container
    div
      default-transition opacity transform, 1.9s, smooth-in
      transform scale(0.8) translateY(80%);
      opacity 0

      for num in (1..8)
        &:nth-of-type({num})
          transition-delay (num * 0.1s)

      &.in-viewport
        transform none
        opacity 1

  .bg-clip-text
    background-size 200%
    animation whoosh 2s linear infinite
    background-image linear-gradient(90deg, theme('colors.pink'), theme('colors.purple'), theme('colors.pink'), theme('colors.purple'), theme('colors.pink'))
</style>
