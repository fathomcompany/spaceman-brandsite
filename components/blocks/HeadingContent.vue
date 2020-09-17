<!--
HeadingContent
-->

<template lang="pug">
.HeadingContent.h-gutter.relative(
  :class="{ 'text-center': alignment === 'Center' }"
)
  ResponsiveMedia.absolute.inset-0(
    :image="block.imageDesktop"
    :mobileImage="block.imageMobile"
    :fill="true"
  )

  .v-gutter-huge.relative(
    :class="{ 'content-wide': alignment === 'Left', 'content': alignment === 'Center' }"
  )
    ContentfulRichText(:content="block.content")
</template>

<script>
import get from 'lodash.get'

import ContentfulRichText from '~/components/contentful/RichText'
import ResponsiveMedia from '~/components/shared/ResponsiveMedia'

export default {
  name: 'HeadingContent',

  components: { ContentfulRichText, ResponsiveMedia },

  props: {
    block: {
      type: Object,
      required: true
    }
  },

  computed: {
    alignment() {
      return get(this.block, 'alignment', 'Center')
    }
  }
}
</script>

<style lang="stylus" scoped>
.content-wide
  .ContentfulRichText
    max-width 1300px
</style>
