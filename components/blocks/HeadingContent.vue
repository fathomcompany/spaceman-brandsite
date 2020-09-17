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
.HeadingContent
  // background-image url('https://p76.f0.n0.cdn.getcloudapp.com/items/X6uNP0zv/Image%202020-09-15%20at%204.34.24%20PM.png?v=5a1ac2049067768b936cb34d039ad22c')
</style>
