<!--
MediaGrid
-->

<template lang="pug">
.MediaGrid.bg-offblack.h-gutter.py-8.md_py-12.xl_py-20
  .content-wide.relative
    .listing-container.clearfix(
    )
      .item(
        v-for='(asset, index) in block.assets',
        :class='[getAspect(asset)]'
        v-if="asset.vimeoUrl || asset.videoSrc || asset.image"
      )
        .item-wrapper.relative
          .media-container.absolute.inset-0.flex.justify-center.items-center.bg-black.overflow-hidden
            Asset(
              :asset="asset"
              :key="index"
              :index="index"
              :active="activeIndex == index"
              v-on:setActive="onActiveSet"
            )
</template>

<script>
import get from 'lodash.get'
// import ResponsiveMedia from '~/components/shared/ResponsiveMedia'
import Asset from './Asset'

const LAYOUTS = ['square', 'tall', 'wide']

export default {
  name: 'MediaGrid',

  components: { Asset },

  props: {
    block: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      activeIndex: -1
    }
  },

  methods: {
    getRandom() {
      return LAYOUTS[Math.floor(Math.random() * LAYOUTS.length)]
    },

    onActiveSet(index) {
      this.activeIndex = index
    },

    getAspect(asset) {
      const type = get(asset, 'sys.contentType.sys.id')
      switch (type) {
        case 'mediaAssetTall':
          return 'Tall'
        case 'mediaAssetWide':
          return 'Wide'
        default:
          return 'Square'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
gap = (20px / 2.5)

.MediaGrid
  .content-wide
    width 'calc(100% + %s)' % gap

  .listing-container
    margin-left (gap / -2)

  .media-container
    margin gap

  .item
    float left
    @media (max-width tablet)
      width 100%

  .item.Tall
    @media (min-width (tablet + 1px))
      width 33.3333%

      .item-wrapper
        padding-bottom 'calc(177.78% - %s)' % (gap * 1.5)

    @media (max-width tablet)
      .item-wrapper
        padding-bottom 200%

  .item.Square
    @media (min-width (tablet + 1px))
      width 33.3333%

      .item-wrapper
        padding-bottom 'calc(100% - %s)' % 0px

    @media (max-width tablet)
      .item-wrapper
        padding-bottom 100%

  .item.Wide
    @media (min-width (tablet + 1px))
      width 100%

      .item-wrapper
        padding-bottom 'calc(56.25% - %s)' % (-1 * gap)

    @media (max-width tablet)
      .item-wrapper
        padding-bottom 56.25%
</style>
