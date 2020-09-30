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
.MobileFirstContent
  aspect-ratio 1, false

  @media(max-width tablet)
    aspect-ratio 0.6/1, false

.content-container
  width 40%
  max-width 550px
  padding-right 8%
  padding-top 8%

  @media(max-width tablet)
    width 60%
    padding-top 12%
</style>
