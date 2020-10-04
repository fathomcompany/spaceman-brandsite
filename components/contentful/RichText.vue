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
      validator: (val) => ['regular', 'contact'].includes(val)
    }
  },

  data() {
    return {
      renderer
    }
  }
}
</script>

<style lang="stylus">
.ContentfulRichText
  .masked-content
    @apply pb-1;

  /**
  SHARED
   */
  h1
    h1()

  h2
    h2()

  h3
    h3()

  p,
  .p-wrapper
    @apply whitespace-pre-wrap;

    &:empty
      @apply hidden;

    &:not(:last-of-type)
      @apply mb-5;

  h6
    @apply mb-6;

  a
    @apply underline;
    default-transition color, time-fast
    +whenActive()
      color theme('colors.purple')
  /**
   REGULAR
   */
  &.format-regular
    .h-wrapper  + .p-wrapper
      @apply mt-4;

  /**
  CONTACT FORM
   */
  &.format-contact
    p
      fluid font-size, 18, 16
      bold()
</style>
