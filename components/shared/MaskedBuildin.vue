<!--
MaskedBuildin
-->

<template lang="pug">
.MaskedBuildin(
  v-in-viewport.once
  :class="{ 'overflow-hidden' : !allowOverflow, 'md_inset-0 md_absolute': fill  }"
)
  .masked-content(
    :class="[{ active: activator, 'md_inset-0 md_absolute': fill }, animation]"
    :style="{ 'transition-delay': parseInt(delay)+'ms' }"
  )
    slot
</template>

<script>
export default {
  name: 'MaskedBuildin',

  props: {
    activator: {
      type: Boolean,
      default: true
    },

    delay: {
      type: [String, Number],
      default: 200
    },

    animation: {
      type: String,
      default: 'rotate-up'
    },

    allowOverflow: {
      type: Boolean,
      default: false
    },

    fill: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.MaskedBuildin
  .masked-content
    default-transition transform opacity, time-slow, smooth-in
    transform-origin center
    font-family inherit

    &.rotate-up
      transform rotate(3deg) scaleY(0.9) translateY(50px)
      opacity 0

    &.scale
      transform translateY(50px) scale(0)
      opacity 0

    &.scale-right
      opacity 0
      transform scaleX(0)
      transform-origin left

  &.in-viewport
    .masked-content.active
      transform none
      opacity 1
</style>
