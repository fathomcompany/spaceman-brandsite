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
    h('MaskedBuildin', { key }, [
      h('h1', { key }, next(node.content, key, h, next))
    ]),
  [BLOCKS.HEADING_2]: (node, key, h, next) =>
    h('MaskedBuildin', { key, class: { h2: true } }, [
      h(
        'h2',
        { key, class: { 'pb-4': true } },
        next(node.content, key, h, next)
      )
    ]),
  [BLOCKS.HEADING_3]: (node, key, h, next) =>
    h('MaskedBuildin', { key }, [
      h('h3', { key }, next(node.content, key, h, next))
    ]),
  [BLOCKS.HEADING_4]: (node, key, h, next) =>
    h('MaskedBuildin', { key }, [
      h('h4', { key }, next(node.content, key, h, next))
    ]),
  [BLOCKS.HEADING_5]: (node, key, h, next) =>
    h('MaskedBuildin', { key }, [
      h('h5', { key }, next(node.content, key, h, next))
    ]),
  [BLOCKS.HEADING_6]: (node, key, h, next) =>
    h('MaskedBuildin', { key }, [
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
  .p-wrapper
    @apply w-95p
  p,
  .p-wrapper
    @apply whitespace-pre-wrap

    &:empty
      @apply hidden

    &:not(:last-of-type)
      @apply mb-12

    @media (max-width: tablet)
      @apply w-full

      &:not(:last-of-type)
        @apply mb-8

  h6
    eyebrow()
    @apply mb-6

  /**
  REGULAR
  */
  &.format-regular
    p,
    .p-wrapper
      @apply text-4xl
      book()

      @media (max-width: tablet - 1px)
        @apply text-xl

  /**
  PROJECT
  */
  &.format-project
    .h2
      @apply text-55xl leading-none mb-4
      book()

      + p,
      + .p-wrapper
        @apply mt-16

      @media (max-width: tablet)
        @apply text-35xl mb-2

        + p,
        + .p-wrapper
          @apply mt-12

    p,
    .p-wrapper
      @apply text-xl
      regular()

      @media (max-width: tablet)
        @apply text-xl

    a
      @apply underline

  /**
  COLUMN
  */
  &.format-column
    h3
      @apply text-4xl

    h4
      @apply text-35xl
      book()

      @media (max-width: tablet - 1px)
        @apply text-25xl

    h5
      book()
      @apply text-2xl

    p,
    .p-wrapper
      @apply text-xl

      &:not(:first-child)
        @apply mt-10

        @media (max-width: tablet - 1px)
          @apply mt-6

  /**
  SECTION
  */
  &.format-section
    .h2
      @apply text-5xl leading-none mb-4
      font-family 'medium', Arial, sans-serif

      @media (max-width: tablet - 1px)
        @apply text-35xl

    .p-wrapper
      font-family 'regular', Arial, sans-serif
      @apply text-15xl

      @media (max-width: tablet - 1px)
        @apply text-xl
</style>
