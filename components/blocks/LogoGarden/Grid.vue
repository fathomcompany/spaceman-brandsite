<!--
LogoGrid
-->

<template lang="pug">
.LogoGrid.flex.justify-center.flex-wrap
  .logo(v-for="logo in logos")
    visual(:aspect="1.25" :image="makeSrc(logo)" background="contain")
</template>

<script>
import { makeSrc, getAlt } from '~/utils/images'

export default {
  name: 'LogoGrid',

  props: {
    logos: {
      type: Array,
      default: () => []
    }
  },

  methods: {
    makeSrc(image) {
      return makeSrc(image)
    },
    getAlt(image) {
      return getAlt(image)
    }
  }
}
</script>

<style lang="stylus" scoped>
.LogoGrid
  .logo
    width 12%
    margin 0 2% 3%

    @media(max-width tablet)
      width 22%
      margin 0 5% 5%
</style>
