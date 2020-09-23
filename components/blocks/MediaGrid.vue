<!--
MediaGrid
-->

<template lang="pug">
.MediaGrid.bg-offblack.h-gutter.py-8.md_py-12.xl_py-20
  .content-wide.relative
    .grid(
      v-masonry
      :maxCols="3"
      :maxColWidth="800"
      :gap="10"
      transition-duration="0s"
    )
      .item(
        v-masonry-tile
        v-for="(n,index) in 40"
        :class="[getRandom()]"
      )
        .item-wrapper.relative
          .absolute.inset-0.m-2.bg-pink
</template>

<script>
const LAYOUTS = ['square', 'tall', 'wide']

export default {
  name: 'MediaGrid',

  methods: {
    getRandom() {
      return LAYOUTS[Math.floor(Math.random() * LAYOUTS.length)]
    }
  }
}
</script>

<style lang="stylus" scoped>
gap = 20px
.MediaGrid
  .content-wide
    width "calc(100% + %s)" % (gap)
    margin-left (gap/-2)

  .item
    @media(max-width tablet)
      width 100%

  .item.tall
    @media(min-width (tablet + 1px))
      width 33.3333%

      .item-wrapper
        padding-bottom "calc(200% - %s)" % (gap)

    @media(max-width tablet)
      .item-wrapper
        padding-bottom 200%

  .item.square
    @media(min-width (tablet + 1px))
      width 33.3333%

      .item-wrapper
        padding-bottom "calc(100% - %s)" % (gap/2)

    @media(max-width tablet)
      .item-wrapper
        padding-bottom 100%

  .item.wide
    @media(min-width (tablet + 1px))
      width 66.6666%

      .item-wrapper
        padding-bottom "calc(50% - %s)" % (gap/2)

    @media(max-width tablet)
      .item-wrapper
        padding-bottom 56.25%
</style>
