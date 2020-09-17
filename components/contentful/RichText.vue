<!--
ContentfulRichText
-->

<template lang="pug">
.ContentfulRichText(
  v-if="content"
  :class="['format-'+formatting]"
)
  RichTextRenderer(:document="content" :nodeRenderers="renderer")
</template>

<script>
import { BLOCKS } from '@contentful/rich-text-types'
import RichTextRenderer from 'contentful-rich-text-vue-renderer'
import Contentful from 'bukwild-contentful-utils'
import { makeSrc } from '~/utils/images'

const renderer = {
  // Support embedded images
  [BLOCKS.EMBEDDED_ASSET]: (node, key, h) => {
    return h('visual', {
      key,
      props: {
        image: makeSrc(node.data.target),
        aspect: Contentful.aspect(node.data.target) || 16 / 9,
        alt: node.data.target.fields.title
      }
    })
  },
  [BLOCKS.PARAGRAPH]: (node, key, h, next) =>
    h('MaskedBuildin', { key, class: { 'p-wrapper': true } }, [
      h('p', { key }, next(node.content, key, h, next))
    ]),

  [BLOCKS.HEADING_1]: (node, key, h, next) =>
    h('MaskedBuildin', { key, class: { 'h-wrapper': true } }, [
      h('h1', { key }, next(node.content, key, h, next))
    ]),
  [BLOCKS.HEADING_2]: (node, key, h, next) =>
    h('MaskedBuildin', { key, class: { 'h-wrapper': true } }, [
      h('h2', { key }, next(node.content, key, h, next))
    ]),
  [BLOCKS.HEADING_3]: (node, key, h, next) =>
    h('MaskedBuildin', { key, class: { 'h-wrapper': true } }, [
      h('h3', { key }, next(node.content, key, h, next))
    ]),
  [BLOCKS.HEADING_4]: (node, key, h, next) =>
    h('MaskedBuildin', { key, class: { 'h-wrapper': true } }, [
      h('h4', { key }, next(node.content, key, h, next))
    ]),
  [BLOCKS.HEADING_5]: (node, key, h, next) =>
    h('MaskedBuildin', { key, class: { 'h-wrapper': true } }, [
      h('h5', { key }, next(node.content, key, h, next))
    ]),
  [BLOCKS.HEADING_6]: (node, key, h, next) =>
    h('MaskedBuildin', { key, class: { 'h-wrapper': true } }, [
      h('h6', { key }, next(node.content, key, h, next))
    ])
}

export default {
  name: 'ContentfulRichText',

  components: { RichTextRenderer },

  props: {
    content: {
      type: Object,
      default: () => null
    },

    formatting: {
      type: String,
      default: 'regular',
      validator: (val) =>
        ['regular', 'project', 'column', 'section'].includes(val)
    }
  },

  data() {
    return {
      renderer
    }
  }
}
</script>

<style lang="stylus" scoped>
.ContentfulRichText
  /**
  SHARED
   */
  h1
    h1()

  .h-wrapper  + .p-wrapper
      @apply mt-4;

  p,
  .p-wrapper
    @apply whitespace-pre-wrap;

    &:empty
      @apply hidden;

    &:not(:last-of-type)
      @apply mb-12;

    @media (max-width: tablet)
      @apply w-full;

      &:not(:last-of-type)
        @apply mb-8;

  h6
    @apply mb-6;
</style>
