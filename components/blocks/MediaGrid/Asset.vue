<!--
MediaGridAsset
-->

<template lang="pug">
.MediaGridAsset.absolute.inset-0(
  @click="onClick"
  :class="{ active, 'cursor-pointer has-video': (videoSrc || vimeoUrl) }"
)
  visual.image(
    v-if="image"
    :image="imageSrc"
    :alt="imageAlt"
    :fill="true"
  )

  .lighten-screen.absolute.inset-0.flex.justify-center.items-center(
    v-if="videoSrc || vimeoUrl"
  )
    PlayButton.text-white.play-icon.text-4xl

  visual.video(
    ref="video"
    v-if="videoSrc && !vimeoUrl"
    :video="videoSrc"
    :fill="true"
    load="visible"
    :autoplay="false"
    :muted="false"
    playsinline
    loop
    controls
  )

  VimeoPlayer.video(
    v-if='vimeoUrl'
    :url='vimeoUrl'
    :shouldPlay="active"
    :playerID="'grid-'+index"
    in-viewport-root-margin='100% 0%'
  )
</template>

<script>
import get from 'lodash.get'
import { makeSrc } from '~/utils/images'

import PlayButton from '~/assets/svg/play-button.svg?inline'
import VimeoPlayer from '~/components/shared/VimeoPlayer'

export default {
  name: 'MediaGridAsset',

  components: { PlayButton, VimeoPlayer },

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
    },

    vimeoUrl() {
      return get(this.asset, 'vimeoUrl')
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
      if (!this.videoSrc && !this.vimeoUrl) return

      this.$emit('setActive', this.index)
    }
  }
}
</script>

<style lang="stylus">

.MediaGridAsset
  .image
    .vv-fill
      right -1px !important

  .video
    opacity 0
    pointer-events none
    default-transition opacity, time-reg, smooth-in, 0.4s
    width calc(100% + 1px) !important

  .lighten-screen
    default-transition background-color, time-slow
    background-color transparent

  .play-icon
    default-transition transform opacity, time-reg
    width 50px
    path
      fill white

  &.has-video
    &:hover
      .lighten-screen
        background-color rgba(white, 0.15)

      .play-icon
        transform scale(1.1)

  &.active
    .play-icon
      transform scale(0.5) !important
      opacity 0

    .video
      opacity 1
      pointer-events all
</style>
