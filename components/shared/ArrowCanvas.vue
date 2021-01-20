<!--
ArrowCanvas
-->

<template lang="pug">
canvas.ArrowCanvas.absolute.inset-0.w-full.h-full(v-show="introLoaded")
</template>

<script>
const FRAME_WIDTH = 50
// const NUMBER_OF_FRAMES = 35
const GLITCH_FRAME = 30
const FPS = 1000 / 12

export default {
  name: 'ArrowCanvas',

  data() {
    return {
      introLoaded: false,
      isGlitching: false,
      nextGlitch: false,
      img: null,
      ctx: null,
      frame: 0,
      now: null,
      elapsed: null,
      then: null,
      animationID: null
    }
  },

  async mounted() {
    if (!window || typeof window === 'undefined') return

    this.then = Date.now()

    // Grab context
    this.ctx = this.$el.getContext('2d')

    // Load images
    try {
      this.img = await this.loadImage('/image/caret.png')

      this.imageReady()
    } catch (e) {
      console.log('caret failed to load ')
    }
  },

  destroyed() {
    cancelAnimationFrame(this.animationID)
    clearInterval(this.timeoutID)
  },

  methods: {
    imageReady() {
      this.introLoaded = true
      this.timeoutID = setTimeout(this.init, 2000)
    },

    init() {
      this.animationID = requestAnimationFrame(this.draw)
    },

    draw() {
      this.animationID = requestAnimationFrame(this.draw)

      this.now = Date.now()
      this.elapsed = this.now - this.then

      // if enough time has elapsed, draw the next frame

      if (this.elapsed < FPS) return

      if (this.nextGlitch) return

      this.then = this.now - (this.elapsed % FPS)

      if (!this.isGlitching) {
        this.frame++
        if (this.frame === GLITCH_FRAME) this.isGlitching = true
      } else {
        this.frame++
        if (this.frame > GLITCH_FRAME) {
          // this.frame = GLITCH_FRAME
          this.nextGlitch = true
          // this.timeoutID = setTimeout(
          //   this.resetGlitch,
          //   500 + Math.random() * 1500
          // )
        }
      }

      this.ctx.clearRect(0, 0, this.$el.width, this.$el.height)
      this.ctx.drawImage(
        this.img,
        this.frame * FRAME_WIDTH,
        0,
        FRAME_WIDTH,
        this.img.height, // source rectangle
        0,
        0,
        this.$el.width,
        this.$el.height // destination rectangle
      )
    },

    resetGlitch() {
      this.nextGlitch = false
    },

    loadImage(url) {
      const img = new Image()

      return new Promise((resolve, reject) => {
        img.addEventListener('load', () => {
          resolve(img)
        })

        img.addEventListener('error', (e) => {
          reject(e)
        })

        img.src = url
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.ArrowCanvas
  //
</style>
