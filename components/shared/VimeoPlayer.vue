<!--
The vimeo modal
-->

<template lang="pug">
.VimeoPlayer(
  :id="playerID",
  :class="{ show: videoReady }"
)
</template>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<script>
import Player from '@vimeo/player'

export default {
  props: {
    playerID: {
      type: String,
      default() {
        return 'conference-video-container'
      }
    },

    shouldPlay: {
      type: Boolean,
      default: false
    },

    autoplay: {
      type: Boolean,
      default: false
    },

    controls: {
      type: Boolean,
      default: true
    },

    loop: {
      type: Boolean,
      default: false
    },

    url: {
      type: String,
      required: true,
      default() {
        return null
      }
    }
  },

  data() {
    return {
      player: null,
      videoReady: false
    }
  },

  watch: {
    shouldPlay(nv, ov) {
      if (nv) this.playVideo()
      else this.pauseVideo()
    }
  },

  mounted() {
    this.initPlayer()
  },

  beforeDestroy() {
    if (this.player) {
      this.player.destroy()
      this.player = null
    }
  },

  methods: {
    initPlayer() {
      if (!this.playerID) {
        // eslint-disable-next-line no-console
        console.log(
          'No player ID specified for this video, cannot mount video',
          this.url
        )
        return
      }

      if (!this.url) {
        // eslint-disable-next-line no-console
        console.log(
          'No Vimeo URL specified for this section, cannot mount video'
        )
        return
      }

      this.player = new Player(this.playerID, {
        url: this.url,
        width: '100%',
        controls: this.controls,
        autoplay: this.autoplay,
        loop: this.loop,
        responsive: true,
        byline: false,
        portrait: false,
        title: false,
        referrer: process.env.BASE_URL
      })

      this.player.on('loaded', this.onVideoLoaded)
    },

    playVideo() {
      if (!this.player) return
      this.player.play()
    },

    pauseVideo() {
      if (!this.player) return
      this.player.pause()
    },

    onVideoLoaded() {
      this.videoReady = true
    }
  }
}
</script>

<!-- ––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– -->

<style lang="stylus">
.VimeoPlayer
  expand()
  z-index 0
  opacity 0
  transition opacity 0.5s 1s ease

  > div
    // padding-top 100% !important
    width calc(100% + 2px)
    left -1px

  iframe
    object-fit cover

  &.show
    opacity 1

  // Transition in
  &.v-enter-active
    animation scale-enter ease-in-out-quad 1s
    this.keyframes scale-enter
      0%
        transform translate(-50%, -30%)
        opacity 0
      35%
        transform translate(-50%, -55%)
        opacity 1
      60%
        transform translate(-50%, -50%)

  // Transition out
  &.v-leave-active
    animation scale-leave ease-in-out-quart .7s
    this.keyframes scale-leave
      0%
        transform translate(-50%, -50%)
      50%
        transform translate(-50%, -55%)
      100%
        transform translate(-50%, -30%)
</style>
