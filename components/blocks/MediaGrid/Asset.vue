<!--
MediaGridAsset
-->

<template lang="pug">
.MediaGridAsset.absolute.inset-0(
  @click="onClick"
  :class="{ active, 'cursor-pointer has-video': !!videoSrc }"
)
  visual.image(
    v-if="image"
    :image="imageSrc"
    :alt="imageAlt"
    :fill="true"
  )

  .lighten-screen.absolute.inset-0.flex.justify-center.items-center(v-if="videoSrc")
    span.text-white.play-icon.text-4xl ►

  visual.video(
    ref="video"
    v-if="videoSrc"
    :video="videoSrc"
    :fill="true"
    load="visible"
    :autoplay="false"
    :muted="false"
    loop
    controls
  )
</template>

<script>
import get from 'lodash.get'
import { makeSrc } from '~/utils/images'

export default {
  name: 'MediaGridAsset',

  props: {
    asset: {
      type: Object,
      required: true
    },

    index: {
      type: Number,
      required: true
    },

    active: {
      type: Boolean
    }
  },

  computed: {
    videoSrc() {
      return get(this.asset, 'video.fields.file.url')
    },

    image() {
      return get(this.asset, 'image')
    },

    imageSrc() {
      return makeSrc(this.image)
    },

    imageAlt() {
      return this.$imgAlt(this.image)
    }
  },

  watch: {
    active(nv) {
      if (!this.$refs.video) return

      if (nv) this.$refs.video.play()
      else this.$refs.video.pause()
    }
  },

  methods: {
    onClick() {
      // Can't play a video that isn't set
      if (!this.videoSrc) return

      console.log('clicked')
      this.$emit('setActive', this.index)
    }
  }
}
</script>

<style lang="stylus" scoped>
.MediaGridAsset

  .video
    opacity 0
    pointer-events none
    default-transition opacity, time-reg

  .lighten-screen
    default-transition background-color, time-slow
    background-color transparent

  .play-icon
    default-transition transform, time-slow

  &.has-video
    &:hover
      .lighten-screen
        background-color rgba(white, 0.15)

      .play-icon
        transform scale(1.2)

  &.active
    .video
      opacity 1
      pointer-events all
</style>