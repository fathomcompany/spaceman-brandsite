<!--
CloseButton
-->

<template lang="pug">
.CloseButton.fixed.right-0.top-0.text-6xl.font-hairline.z-50.mt-4.mr-4.md_mt-5.md_mr-5.origin-center.h-8.w-8.md_h-12.md_w-12
  nuxt-link.inset-0.absolute(to="/")
    .bar.bg-white.absolute.h-full.transform.rotate-45.origin-center.left-50p
    .bar.bg-white.absolute.h-full.transform.-rotate-45.origin-center.left-50p
</template>

<script>
export default {
  name: 'CloseButton'
}
</script>

<style lang="stylus" scoped>
.CloseButton
  default-transition transform, time-reg

  &:hover
    transform scale(1.1)

  &:active
    transform scale(0.9)

.bar
  width 2px
</style>

<style lang="stylus">
.ie11 .CloseButton
  .bar
    &:nth-of-type(1)
      transform rotate(45deg)

    &:nth-of-type(2)
      transform rotate(-45deg)
</style>
