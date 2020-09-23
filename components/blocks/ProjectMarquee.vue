<!--
ProjectMarquee
-->

<template lang="pug">
.ProjectMarquee.relative.h-gutter.text-center
  ResponsiveMedia(
    :image="block.imageDesktop"
    :mobileImage="block.imageMobile"
    :fill="true"
    background-position="75% center"
  )
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

  .rich-text
    max-width 950px
</style>
