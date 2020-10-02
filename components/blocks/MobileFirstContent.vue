<!--
MobileFirstContent
-->

<template lang="pug">
.MobileFirstContent.bg-cover.bg-right.relative

  ResponsiveMedia.absolute.inset-0(
    :image="block.imageDesktop"
    :mobileImage="block.imageMobile"
    :fill="true"
    background-position="right center"
  )

  .content-container.absolute.top-0.right-0
    MaskedBuildin(v-if="block.heading")
      h2.h1(v-html="block.heading")
</template>

<script>
import ResponsiveMedia from '~/components/shared/ResponsiveMedia'

export default {
  name: 'MobileFirstContent',

  components: { ResponsiveMedia },

  props: {
    block: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
mfcBreakpoint = (tablet + 200px)
.MobileFirstContent
  aspect-ratio 1.3/1, false

  @media(max-width mfcBreakpoint)
    aspect-ratio 0.7/1, false

.content-container
  width 40%
  max-width 550px
  width 35%
  padding-right 8%
  padding-top 5%

  @media(max-width mfcBreakpoint)
    width 50%
    padding-top 12%

  @media(max-width mobile)
    width 55%
</style>
