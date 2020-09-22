<!--
ScrollDownArrow
-->

<template lang="pug">
.ScrollDownArrow.absolute.bottom-0.left-50p.py-2.origin-center(@click="scrollDown")
  visual.w-8.transform.w-8.h-5.md_h-8.absolute.inset-0.-rotate-90.translate-x-50p(
    :image="require(`~/assets/image/slider-arrow.png`)"
    background="contain"
    :fill="false"
  )
</template>

<script>
export default {
  name: 'ScrollDownArrow',

  methods: {
    scrollDown() {
      if (!window || typeof window === 'undefined') return
      window.scroll({
        top: window.innerHeight,
        behavior: 'smooth' // 👈
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.ScrollDownArrow
  cursor pointer
  default-transition transform opacity, time-reg, balanced
  +whenActive()
    transform scale(1.1) translateX(5%)
</style>
