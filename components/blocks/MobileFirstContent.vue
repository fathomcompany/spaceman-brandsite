<!--
MobileFirstContent
-->

<template lang="pug">
.MobileFirstContent.bg-cover.bg-right.relative

  ResponsiveMedia.absolute.inset-0(
    :image="block.imageDesktop"
    :mobileImage="block.imageMobile"
    :fill="true"
    background-position="right center"
  )

  .phone-frame.absolute(:class="{ show: frameContentReady && frameReady }")

    visual.device-video.absolute.origin-top-right(
      :video="videoSrc"
      :image="imageSrc"
      :alt="imageAlt"
      background="cover"
      loop autoplay muted
      @video-loaded="frameContentReady = true"
      @image-loaded="frameContentReady = true"
    )

    visual.absolute.inset-0(
      background="contain"
      :image="require(`~/assets/image/phone-frame-flat.png`)"
      :fill="true"
      @image-loaded="frameReady = true"
    )

  .content-container.absolute.top-0.right-0
    MaskedBuildin(v-if="block.heading")
      h2.h1(v-html="block.heading")
</template>

<script>
import get from 'lodash.get'
import { makeSrc } from '~/utils/images'

import ResponsiveMedia from '~/components/shared/ResponsiveMedia'

export default {
  name: 'MobileFirstContent',

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
mfcBreakpoint = (tablet + 200px)
.MobileFirstContent
  aspect-ratio 1.3/1, false

  @media(max-width mfcBreakpoint)
    aspect-ratio 0.7/1, false

.content-container
  width 40%
  max-width 550px
  width 35%
  padding-right 8%
  padding-top 5%

  @media(max-width mfcBreakpoint)
    width 50%
    padding-top 12%

  @media(max-width mobile)
    width 55%

.phone-frame
  padding-bottom 67%
  width 37%
  left 23.4%
  top 12.5%
  opacity 0
  transform translateY(50px) rotate(45deg)
  default-transition transform opacity, time-slow, balanced, 0.2s

  @media(max-width tablet)
    width 57%
    left -16%
    top 21%
    padding-bottom 98%

  &.show
    opacity 1
    transform rotate(45deg)

  .device-video
    position absolute
    left 9%
    right 24%
    top 5%
    bottom 14%
    border-radius 7%
    overflow hidden

    @media(max-width tablet)
      // width 57%
      // left -16%
      // top 21%
      // padding-bottom 98%
</style>
