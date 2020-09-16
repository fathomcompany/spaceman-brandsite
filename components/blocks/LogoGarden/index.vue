<!--
LogoGarden
-->

<template lang="pug">
.LogoGarden.bg-cover.bg-center.h-gutter.flex.text-center
  .content.v-gutter-huge
    Grid(:logos="topLogos")

    h3.h1(
      v-if="block.heading" v-html="block.heading"
      :class="{ 'mt-12 md_mt-8': !!topLogos, 'mb-20': !!bottomLogos }"
    )

    Grid(:logos="bottomLogos")

</template>

<script>
import get from 'lodash.get'

import Grid from './Grid'

export default {
  name: 'LogoGarden',

  components: { Grid },

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
  background-image url('https://p76.f0.n0.cdn.getcloudapp.com/items/6queqOkZ/Image%202020-09-16%20at%2010.40.06%20AM.png?v=12c4bcd295b93e71eb213beea29aebc9')
</style>
