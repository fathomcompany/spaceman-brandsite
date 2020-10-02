<!--
ScrollDownArrow
-->

<template lang="pug">
transition(name='fade')
  .ScrollDownArrow.fixed.bottom-0.left-50p.py-2.origin-center(
    v-if="show"
    @click="scrollDown"
  )
    visual.w-8.transform.w-8.h-5.md_h-8.absolute.inset-0.-rotate-90.translate-x-50p(
      :image="require(`~/assets/image/slider-arrow.png`)"
      background="contain"
      :fill="false"
    )
</template>

<script>
const SCROLL_PERCENT_THRESHOLD = 0.95

export default {
  name: 'ScrollDownArrow',

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

<style lang="stylus" scoped>
.ScrollDownArrow
  // cursor pointer
  // default-transition transform opacity, time-reg, balanced
  // +whenActive()
  //   transform scale(1.1) translateX(5%)
</style>
