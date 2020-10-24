<!--
ScrollDownArrow
-->

<template lang="pug">
transition(name='fade')
  .ScrollDownArrow.fixed.bottom-0.left-50p.py-2.origin-center(
    v-show="show"
    @click="scrollDown"
  )
    .canvas-container.relative.transform.translate-x-50p
      ArrowCanvas

</template>

<script>
import ArrowCanvas from '~/components/shared/ArrowCanvas'

const SCROLL_PERCENT_THRESHOLD = 0.95

export default {
  name: 'ScrollDownArrow',

  components: { ArrowCanvas },

  data() {
    return {
      show: true
    }
  },

  mounted() {
    if (!window || typeof window === 'undefined') return
    this.$win.on('scroll', this.onScroll)
  },

  destroyed() {
    this.$win.off('scroll', this.onScroll)
  },

  methods: {
    onScroll() {
      const position =
        window.scrollY / (document.body.scrollHeight - window.innerHeight)
      this.show = position < SCROLL_PERCENT_THRESHOLD
    },

    scrollDown() {
      // if (!window || typeof window === 'undefined') return
      // window.scroll({
      //   top: window.innerHeight,
      //   behavior: 'smooth' // 👈
      // })
    }
  }
}
</script>

<style lang="stylus">
.ScrollDownArrow
  // cursor pointer
  // default-transition transform opacity, time-reg, balanced
  // +whenActive()
  //   transform scale(1.1) translateX(5%)

  .canvas-container
    width 50px
    height 70px

    @media(max-width tablet)
      width 50px *0.75
      height 70px * 0.75

.ie11 .ScrollDownArrow
  .caret
    transform translateX(-50%) rotate(-90deg)
</style>
