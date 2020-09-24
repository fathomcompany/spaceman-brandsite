<!--
Reel
-->

<template lang="pug">
.Reel.relative.h-gutter

  ResponsiveMedia.absolute.inset-0(
    v-if="block.imageBackground"
    background="cover"
    :image="block.imageBackground"
    :fill="true"
  )

  .content.relative.v-gutter.text-black.text-center
    h2.h1(v-if="block.heading" v-html="block.heading")

    .pt-12.md_py-20(v-if="videoSrc")
      .reel-container.relative(
        :class="{ show: frameVideoReady && frameReady }"
      )
        visual(
          background="contain"
          :aspect="1663/987"
          :image="require(`~/assets/image/television-frame.png`)"
          @image-loaded="frameReady = true"
        )

        visual.reel-video.absolute.origin-top-right(
          :video="videoSrc"
          background="cover"
          :loop="true"
          :muted="true"
          :fill="true"
          @video-loaded="frameVideoReady = true"
        )
</template>

<script>
import get from 'lodash.get'

import ResponsiveMedia from '~/components/shared/ResponsiveMedia'

export default {
  name: 'Reel',

  components: { ResponsiveMedia },

  props: {
    block: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      frameVideoReady: false,
      frameReady: false
    }
  },

  computed: {
    videoSrc() {
      return get(this, 'block.videoInsideTelevision.fields.file.url')
    }
  }
}
</script>

<style lang="stylus" scoped>
.Reel
  // aspect-ratio 1.2/1, false

.reel-container
  opacity 0
  transform scale(0.9) translateY(50px)
  default-transition transform opacity, time-slow, balanced, 0.2s

  &.show
    opacity 1
    transform none

.reel-video
  top 1.75%
  left 1%
  right @left
  bottom 5.5%
  height auto
</style>
