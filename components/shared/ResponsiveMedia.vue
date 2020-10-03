<!--
ResponsiveMedia
-->

<template lang="pug">
.ResponsiveMedia.overflow-hidden(
  v-in-viewport.once="offset"
  :class="{ 'inset-0 absolute': fill, 'relative': !fill }"
)
  visual(
    ref="visual"
    background="cover"
    :backgroundPosition="backgroundPosition"
    :image="imageSrc"
    :alt="imageAlt"
    :aspect="aspect"
    :video="actualVideo"
    :fill="fill"
    autoplay="visible"
    autopause="visible"
    load='visible'
    playsinline loop muted
  )
</template>

<script>
import get from 'lodash.get'
import { makeSrc } from '~/utils/images'

export default {
  name: 'ResponsiveMedia',

  props: {
    image: {
      type: [Object, String],
      default: () => null
    },

    mobileImage: {
      type: [Object, String],
      default: () => null
    },

    video: {
      type: Object,
      default: () => null
    },

    mobileVideo: {
      type: Object,
      default: () => null
    },

    fill: {
      type: Boolean,
      default: false
    },

    offset: {
      type: String,
      default: '-100px 0px'
    },

    backgroundPosition: {
      type: String,
      default: 'center center'
    }
  },

  data() {
    return {
      isMobile: false,
      ready: false
    }
  },

  computed: {
    hasMobileMedia() {
      return !!this.mobileImage || !!this.mobileVideo
    },

    videoSrc() {
      return get(this.video, 'fields.file.url')
    },

    mobileVideoSrc() {
      return get(this.mobileVideo, 'fields.file.url', this.videoSrc)
    },

    actualVideo() {
      if (!this.hasMobileMedia || !this.isMobile) return this.videoSrc
      else return this.mobileVideoSrc
    },

    imageSrc() {
      if (this.mobileImage && this.isMobile) return makeSrc(this.mobileImage)
      else return makeSrc(this.image)
    },

    imageAlt() {
      if (this.mobileImage && this.isMobile)
        return this.$imgAlt(this.mobileImage)
      else return this.$imgAlt(this.image)
    },

    aspect() {
      if (!this.hasMobileMedia || !this.isMobile)
        return this.$contentful.aspect(this.image) || 16 / 9
      else return this.$contentful.aspect(this.mobileImage) || 3 / 4
    }
  },

  watch: {
    isMobile(nv) {}
  },

  created() {
    // hook up resize listener
    if (typeof window === 'undefined') return

    // Responsive sizing isn't relevant if there's no mobile iamge or video
    if (!this.hasMobileMedia) {
      this.ready = true
      return
    }

    this.$win.on('resize', this.onResize)
    this.onResize()
  },

  destroyed() {
    // remove resize listener
    this.$win.off('resize', this.onResize)
  },

  methods: {
    onResize(e) {
      this.isMobile = window.innerWidth < 768
    }
  }
}
</script>

<style lang="stylus" scoped>
.ResponsiveMedia
  default-transition transform, time-slow, smooth-in
  transform scale(1.1)

  &.in-viewport
    transform scale(1)
</style>
