<!--
DigitalCampaigns
-->

<template lang="pug">
.DigitalCampaigns.bg-cover.bg-right.relative

  ResponsiveMedia.absolute.inset-0(
    :image="block.imageBackground"
    :fill="true"
    background-position="left center"
  )

  .phone-frame.absolute
    ResponsiveMedia(
      :image="require(`~/assets/image/phone-frame.png`)"
      :fill="true"
    )

  .content-container.absolute.top-0.right-0.text-right
    h2.h1(v-if="block.heading" v-html="block.heading")
</template>

<script>
import ResponsiveMedia from '~/components/shared/ResponsiveMedia'

export default {
  name: 'DigitalCampaigns',

  components: { ResponsiveMedia },

  props: {
    block: {
      type: Object,
      required: true
    }
  }

  // data() {
  //   return {
  //     PhoneFrame: require('~assets/image/phone-frame.png')
  //   }
  // }
}
</script>

<style lang="stylus" scoped>
.DigitalCampaigns
  aspect-ratio 1, false

.content-container
  width 60%
  padding-right 8%
  padding-top 8%

  @media(max-width tablet)
    width 60%
    padding-top 12%

.phone-frame
  padding-bottom 57%
  width 30%
  left 15%
  top 16%
</style>
