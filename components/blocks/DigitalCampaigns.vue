<!--
DigitalCampaigns
-->

<template lang="pug">
.DigitalCampaigns.bg-cover.bg-right.relative(v-in-viewport.once)

  ResponsiveMedia.absolute.inset-0(
    :image="block.imageBackground"
    :fill="true"
    background-position="right center"
  )

  .phone-frame.absolute(
    v-if="videoSrc || imageSrc"
    :class="{ show: frameContentReady && frameReady }"
  )

    visual.device-video.absolute.origin-top-right(
      :video="videoSrc"
      :image="imageSrc"
      :alt="imageAlt"
      background="cover"
      loop muted
      autoplay="visible"
      autopause="visible"
      load='visible'
      @video-loaded="frameContentReady = true"
      @image-loaded="frameContentReady = true"
    )

    visual.absolute.inset-0(
      background="contain"
      :image="require(`~/assets/image/phone-frame.png`)"
      :fill="true"
      @image-loaded="frameReady = true"
    )

  .content-container.absolute.top-0.right-0.text-right
    MaskedBuildin(v-if="block.heading")
      h2.h1.mb-2(v-html="block.heading")
</template>

<script>
import get from 'lodash.get'
import { makeSrc } from '~/utils/images'
import ResponsiveMedia from '~/components/shared/ResponsiveMedia'

export default {
  name: 'DigitalCampaigns',

  components: { ResponsiveMedia },

  props: {
    block: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      frameContentReady: false,
      frameReady: false
    }
  },

  computed: {
    videoSrc() {
      return get(this, 'block.videoDevice.fields.file.url')
    },

    image() {
      return get(this, 'block.imageDevice')
    },

    imageSrc() {
      return makeSrc(this.image)
    },

    imageAlt() {
      return this.$imgAlt(this.image)
    }
  }
}
</script>

<style lang="stylus" scoped>
.DigitalCampaigns
  aspect-ratio 1.5/1, false

  @media(max-width tablet)
    aspect-ratio 1/1, false

  &.in-viewport
    .phone-frame
      &.show
        opacity 1
        transform none

.content-container
  width 60%
  padding-right 8%
  padding-top 4%

  @media(max-width tablet)
    width 60%
    padding-top 6%

.phone-frame
  padding-bottom 57%
  width 25%
  left 14%
  top -1%
  opacity 0
  transform translateX(-10%)
  default-transition transform opacity, time-slow, balanced, 0.2s

  @media(max-width tablet)
    width 30%
    left 1%
    top 14%

  .device-video
    position absolute
    left 35%
    right 6%
    top 16%
    bottom 25%
    transform skewY(-26deg)
    transform-origin center center
    border-bottom-left-radius 15%
    overflow hidden

    @media(max-width tablet)
      top 9%
      bottom 19%
      right 3%
</style>
