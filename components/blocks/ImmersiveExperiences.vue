<!--
ImmersiveExperiences
-->

<template lang="pug">
.ImmersiveExperiences.relative.overflow-hidden

  ResponsiveMedia.absolute.inset-0.bottom-m10vh(
    v-parallax="0.2"
    :image="block.imageBackground"
    :fill="true"
    background-position="right center"
  )

  .relative.v-gutter.w-full
    .h-gutter(v-if="block.heading")
      MaskedBuildin
        h2.h1.text-white(v-html="block.heading")

    .content-wide
      .text-right(
        :class="{ 'pt-16': !!block.heading }"
        v-if="block.imageLargeRightImage || block.videoLargeRightVideo"
      )
        .background-video.inline-block(v-parallax.absY="0.05")
          .media-container.relative
            ResponsiveMedia.absolute.inset-0(
              :image="block.imageLargeRightImage"
              :video="block.videoLargeRightVideo"
              :fill="true"
              background-position="right center"
            )

      .foreground-video-wrapper(
        v-if="block.imageLowerLeftImage || block.videoLowerLeftVideo"
      )
        .foreground-video.inline-block.relative(v-parallax.absY="-0.05")
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
  .v-gutter.w-full
    @media(max-width tablet)
      padding-top 40px
      padding-bottom @padding-top

    @media(min-width tablet + 1px)
      margin-bottom -50px
      padding-top 40px
      padding-bottom 0

  &:before
    vertical-align top

.background-video
  width 60%

  @media(max-width tablet)
    width 85%

  .media-container
    padding-bottom 100%

.text-right
  transform translateY(-22%)

  @media(max-width tablet)
    transform translateY(-25%)

.foreground-video-wrapper
  margin-top -27%
  transform translateY(-38%)

  @media(max-width tablet)
    margin-top -12%
    transform translateY(40%)

  .foreground-video
    width 55%
    box-shadow 0 20px 80px rgba(black, 0.5)
    z-index 1

    @media(max-width tablet)
      width 85%

    .media-container
      padding-bottom 65%
</style>
