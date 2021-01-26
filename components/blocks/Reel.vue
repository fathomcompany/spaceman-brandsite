<!--
Reel
-->

<template lang="pug">
.Reel.relative.h-gutter.overflow-hidden

  ResponsiveMedia.absolute.inset-0(
    v-if="block.imageBackground"
    background="cover"
    :image="block.imageBackground"
    :fill="true"
  )

  .content.relative.top-gutter-small.text-black.text-center
    MaskedBuildin(v-if="block.heading")
      h2.h1.md_whitespace-pre(v-html="block.heading")

    .reel-container-parent.pt-12.md_pt-16.pb-12(
      v-if="block.videoInsideTelevision"
      v-in-viewport.once
    )
      .reel-container.relative(
        :class="{ show: frameVideoReady && frameReady }"
      )
        visual(
          background="contain"
          :aspect="1662/1178"
          :image="require(`~/assets/image/television-frame.png`)"
          @image-loaded="frameReady = true"
        )

        ResponsiveMedia.reel-video.absolute.origin-top-right(
          :image="block.imageVideoPlaceholder"
          :video="block.videoInsideTelevision"
          :mobileVideo="block.videoMobile"
          background="cover"
          :fill="true"
          @image-loaded="frameVideoReady = true"
        )
</template>

<script>
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
  }
}
</script>

<style lang="stylus" scoped>
.Reel
  //

.reel-container
  opacity 0
  transform scale(0.9) translateY(50px)
  default-transition transform opacity, time-slow, balanced, 0.2s

.reel-container-parent
  &.in-viewport
    .reel-container
      &.show
        opacity 1
        transform none

.reel-video
  top 0.6%
  left 0.35%
  right 0.3%
  bottom 19.3%
  height auto
  width auto !important
  height @width

  @media(max-width tablet)
    bottom 19.25%
    left 0.66%
    right 0.6%
    top 1%
</style>
