<!--
MediaGrid
-->

<template lang="pug">
.MediaGrid.bg-offblack.h-gutter.py-8.md_py-12.xl_py-20
  .content-wide.relative
    .grid(
      v-masonry,
      :maxCols='3',
      :maxColWidth='800',
      :gap='10',
      transition-duration='0s'
      :destroy-delay="5000"
    )
      .item(
        v-masonry-tile,
        v-for='(asset, index) in block.assets',
        :class='[asset.aspect || "Square"]'
      )
        .item-wrapper.relative
          .media-container.absolute.inset-0.flex.justify-center.items-center.bg-black
            ResponsiveMedia(
              :image='asset.image',
              :video='asset.video',
              :fill='true'
            )
</template>

<script>
import ResponsiveMedia from '~/components/shared/ResponsiveMedia'

const LAYOUTS = ['square', 'tall', 'wide']

export default {
  name: 'MediaGrid',

  components: { ResponsiveMedia },

  props: {
    block: {
      type: Object,
      required: true
    }
  },

  methods: {
    getRandom() {
      return LAYOUTS[Math.floor(Math.random() * LAYOUTS.length)]
    }
  }
}
</script>

<style lang="stylus" scoped>
gap = (20px / 2.5)

.MediaGrid
  .content-wide
    width 'calc(100% + %s)' % gap

  .grid
    margin-left (gap / -2)

  .media-container
    margin gap

  .item
    @media (max-width tablet)
      width 100%

  .item.Tall
    @media (min-width (tablet + 1px))
      width 33.3333%

      .item-wrapper
        padding-bottom 'calc(200% - %s)' % gap

    @media (max-width tablet)
      .item-wrapper
        padding-bottom 200%

  .item.Square
    @media (min-width (tablet + 1px))
      width 33.3333%

      .item-wrapper
        padding-bottom 'calc(100% - %s)' % (gap / 2)

    @media (max-width tablet)
      .item-wrapper
        padding-bottom 100%

  .item.Wide
    @media (min-width (tablet + 1px))
      width 66.6666%

      .item-wrapper
        padding-bottom 'calc(50% - %s)' % (gap / 2)

    @media (max-width tablet)
      .item-wrapper
        padding-bottom 56.25%
</style>
