<!--
ProjectMarquee
-->

<template lang="pug">
.ProjectMarquee.relative.h-gutter
  ResponsiveMedia(
    :image="block.imageDesktop"
    :mobileImage="block.imageMobile"
    :fill="true"
  )
  .content-wide.relative
    ContentfulRichText(:content="block.content")
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

  .content-wide
    max-width 875px
</style>
