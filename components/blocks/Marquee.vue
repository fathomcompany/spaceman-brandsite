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
</template>

<script>
import ResponsiveMedia from '~/components/shared/ResponsiveMedia'

export default {
  name: 'Marquee',

  components: { ResponsiveMedia },

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
