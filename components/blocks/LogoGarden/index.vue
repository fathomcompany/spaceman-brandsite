<!--
LogoGarden
-->

<template lang="pug">
.LogoGarden.bg-cover.bg-center.h-gutter.flex.text-center.relative

  ResponsiveMedia.absolute.inset-0(
    v-if="block.imageBackground || block.videoBackground"
    background="cover"
    :image="block.imageBackground"
    :video="block.videoBackground"
    :fill="true"
  )

  .content.v-gutter-huge
    Grid(:logos="topLogos")

    MaskedBuildin(v-if="block.heading")
      h3.h1(
        v-html="block.heading"
        :class="{ 'mt-12 md_mt-8': !!topLogos, 'mb-20': !!bottomLogos }"
      )

    Grid(:logos="bottomLogos")

</template>

<script>
import get from 'lodash.get'

import Grid from './Grid'
import ResponsiveMedia from '~/components/shared/ResponsiveMedia'

export default {
  name: 'LogoGarden',

  components: {
    Grid,
    ResponsiveMedia
  },

  props: {
    block: {
      type: Object,
      required: true
    }
  },

  computed: {
    topLogos() {
      return get(this.block, 'logoGroupTop')
    },

    bottomLogos() {
      return get(this.block, 'logoGroupBottom')
    }
  }
}
</script>

<style lang="stylus" scoped>
.LogoGarden
  //
</style>
