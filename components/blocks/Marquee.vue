<!--
Marquee
-->

<template lang="pug">
.Marquee.min-h-screen.relative

  ResponsiveMedia.absolute.inset-0(
    :image="block.imageBackground"
    :video="block.videoBackground"
    :mobileVideo="block.videoMobile"
    :fill="true"
    background-position="center center"
  )

  ScrollDownArrow

</template>

<script>
import ResponsiveMedia from '~/components/shared/ResponsiveMedia'
import ScrollDownArrow from '~/components/shared/ScrollDownArrow'

export default {
  name: 'Marquee',

  components: { ResponsiveMedia, ScrollDownArrow },

  props: {
    block: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.Marquee
  //
</style>
