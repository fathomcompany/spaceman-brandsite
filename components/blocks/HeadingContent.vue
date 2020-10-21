<!--
HeadingContent
-->

<template lang="pug">
.HeadingContent.h-gutter.relative(
  :class="{ 'text-center': alignment === 'Center' }"
)
  .aspect-item(
    v-if="block.imageAspectSizing && aspect !== 0"
    :style="{ 'padding-top': aspect }"
  )

  ResponsiveMedia.absolute.inset-0(
    v-if="block.imageDesktop || block.imageMobile"
    ref="content"
    :image="block.imageDesktop"
    :mobileImage="block.imageMobile"
    :fill="true"
  )

  .v-gutter-huge.relative.inline-block(
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

  data() {
    return {
      ready: false
    }
  },

  computed: {
    alignment() {
      return get(this.block, 'alignment', 'Center')
    },

    aspect() {
      if (!this.ready) return 0

      if (!this.$refs.content) return 0

      console.log(this.$refs.content.aspect)
      return `${(1 / this.$refs.content.aspect) * 100}%`
    }
  },

  mounted() {
    this.ready = true
  }
}
</script>

<style lang="stylus" scoped>
.HeadingContent
  font-size 0

.aspect-item
  height 100%;
  display inline-block
  vertical-align top

.ContentfulRichText
  font-size initial
  max-width 1300px
</style>
