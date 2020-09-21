<!--
DigitalCampaigns
-->

<template lang="pug">
.DigitalCampaigns.bg-cover.bg-right.relative

  ResponsiveMedia.absolute.inset-0(
    :image="block.imageBackground"
    :fill="true"
    background-position="right center"
  )

  .phone-frame.absolute(:class="{ show: frameVideoReady && frameReady }")

    visual.device-video.absolute.origin-top-right(
      video="http://www.exit109.com/~dnn/clips/RW20seconds_2.mp4"
      background="cover"
      loop autoplay muted
      @video-loaded="frameVideoReady = true"
    )

    visual.absolute.inset-0(
      background="contain"
      :image="require(`~/assets/image/phone-frame.png`)"
      :fill="true"
      @image-loaded="frameReady = true"
    )

  .content-container.absolute.top-0.right-0.text-right
    h2.h1(v-if="block.heading" v-html="block.heading")
</template>

<script>
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
      frameVideoReady: false,
      frameReady: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.DigitalCampaigns
  aspect-ratio 1, false

.content-container
  width 60%
  padding-right 8%
  padding-top 8%

  @media(max-width tablet)
    width 60%
    padding-top 12%

.phone-frame
  padding-bottom 57%
  width 30%
  left 2%
  top 16%
  opacity 0
  transform translateY(50px)
  default-transition transform opacity, time-slow, balanced, 0.2s

  &.show
    opacity 1
    transform none

  .device-video
    position absolute
    left 32%
    right 7%
    top 3%
    bottom 30%
    transform skewY(-33deg)
    border-bottom-left-radius 15%
    overflow hidden
</style>
