<!--
MediaGrid
-->

<template lang="pug">
.MediaGrid.bg-offblack.h-gutter.py-8.md_py-12.xl_py-20
  .content-wide.relative
    .flex.flex-wrap
      .item.Square(
        v-for='(asset, index) in block.assets',
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
    }
  }
}
</script>

<style lang="stylus" scoped>
gap = (20px / 2.5)

.MediaGrid
  //

.content-wide
  width 'calc(100% + %s)' % gap
  margin-left (gap / -2)

.media-container
  margin gap

.item
  .item-wrapper
    padding-bottom 'calc(100% - %s)' % (gap / 2)

  @media (min-width (tablet-landscape + 1px))
    width 33.3333%

  @media(max-width tablet-landscape)
    width 50%

  @media (max-width mobile-landscape)
    width 100%
</style>
