<!--
ProjectMarquee
-->

<template lang="pug">
.ProjectMarquee.relative.h-gutter.text-center.overflow-hidden
  ResponsiveMedia.bottom-m10vh(
    v-parallax="0.2"
    v-if="block.imageDesktop || block.imageMobile"
    :image="block.imageDesktop"
    :mobileImage="block.imageMobile"
    :fill="true"
    background-position="75% center"
  )

  .color-screen.absolute.inset-0.opacity-50.bg-black

  .content-wide.relative.top-gutter-huge.bottom-gutter.text-left.w-full
    ContentfulRichText.rich-text(:content="block.content")
</template>

<script>
import ContentfulRichText from '~/components/contentful/RichText'
import ResponsiveMedia from '~/components/shared/ResponsiveMedia'

export default {
  name: 'ProjectMarquee',

  components: { ContentfulRichText, ResponsiveMedia },

  props: {
    block: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.ProjectMarquee
  aspect-ratio 2.5/1, true

  .color-screen
    @media(min-width  (tablet+1px))
      display none

  .rich-text
    max-width 950px
</style>
