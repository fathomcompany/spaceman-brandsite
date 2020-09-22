<!--
MediaGrid
-->

<template lang="pug">
.MediaGrid.p-12
  .grid(
    v-masonry
    :maxCols="3"
    :maxColWidth="800"
    :gap="10"
  )
    .item(
      v-masonry-tile
      v-for="(n,index) in 20"
      :class="[getRandom()]"
    )
      .item-wrapper.relative
        .absolute.inset-0.m-2.bg-pink
</template>

<script>
const LAYOUTS = ['square', 'tall']

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

  .item

  .item.tall
    width 33.3333%

    .item-wrapper
      padding-bottom "calc(200% - %s)" % (gap/2)

  .item.square
    width 33.3333%

    .item-wrapper
      padding-bottom 100%


  .item.wide
    width 66.6666%

    .item-wrapper
      padding-bottom "calc(50% - %s)" % (gap/2)
</style>
