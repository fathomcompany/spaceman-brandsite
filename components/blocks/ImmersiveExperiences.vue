<!--
ImmersiveExperiences
-->

<template lang="pug">
.ImmersiveExperiences.relative

  ResponsiveMedia.absolute.inset-0(
    :image="block.imageBackground"
    :fill="true"
    background-position="right center"
  )

  .relative.v-gutter.w-full
    .h-gutter(v-if="block.heading")
      MaskedBuildin
        h2.h1.text-black(v-html="block.heading")

    .text-right(:class="{ 'pt-16': !!block.heading }")
      .background-video.inline-block
        .media-container.relative
          ResponsiveMedia.absolute.inset-0(
            :image="block.imageLargeRightImage"
            :video="block.videoLargeRightVideo"
            :fill="true"
            background-position="right center"
          )

    .foreground-video-wrapper
      .foreground-video.inline-block.relative
        .media-container.relative
          ResponsiveMedia.absolute.inset-0(
            :image="block.imageLowerLeftImage"
            :video="block.videoLowerLeftVideo"
            :fill="true"
            background-position="right center"
          )
</template>

<script>
import ResponsiveMedia from '~/components/shared/ResponsiveMedia'

export default {
  name: 'ImmersiveExperiences',

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
.ImmersiveExperiences
  // aspect-ratio 1, true

  // @media(max-width tablet)
  //   aspect-ratio 0.6/1, false

  &:before
    vertical-align top

.background-video
  width 70%

  @media(max-width tablet)
    width 85%

  .media-container
    padding-bottom 100%

.foreground-video-wrapper
  margin-top -32%

  @media(max-width tablet)
    margin-top -12%

  .foreground-video
    width 60%
    box-shadow 0 20px 80px rgba(black, 0.5)
    z-index 1

    @media(max-width tablet)
      width 90%

    .media-container
      padding-bottom 65%
</style>
