<!--

GlobalFooter

-->

<template lang="pug">
footer.GlobalFooter.pt-12.pb-12.md_py-10.h-gutter.relative

  .second-gradient.absolute.inset-0

  visual.noise.opacity-75.md_opacity-100(
    :image="noiseImage"
    :fill="true"
    background="contain"
  )

  .content-wide.flex.justify-between.flex-col-reverse.md_flex-row
    MaskedBuildin.mt-12.md_mt-0(:delay="300")
      span.copywright.md_max-w-70p.text-sm {{ copyright }}

    MaskedBuildin.socials.md_text-right
      span.whitespace-no-wrap
        a(
          v-if="settings.footerInstagramUrl"
          :href="settings.footerInstagramUrl"
          target="_blank" rel="noopener noreferrer"
        )
          InstagramIcon

        a.ml-5(
          v-if="settings.footerFacebookUrl"
          :href="settings.footerFacebookUrl"
          target="_blank" rel="noopener noreferrer"
        )
          FacebookIcon

        a.ml-5(
          v-if="settings.footerTwitterUrl"
          :href="settings.footerTwitterUrl"
          target="_blank" rel="noopener noreferrer"
        )
          TwitterIcon

        a.ml-5(
          v-if="settings.footerDribbbleUrl"
          :href="settings.footerDribbbleUrl"
          target="_blank" rel="noopener noreferrer"
        )
          DribbbleIcon

        a.ml-5(
          v-if="settings.footerPinterestUrl"
          :href="settings.footerPinterestUrl"
          target="_blank" rel="noopener noreferrer"
        )
          PinterestIcon

</template>

<script>
import get from 'lodash.get'

import FacebookIcon from '~/assets/svg/facebook.svg?inline'
import TwitterIcon from '~/assets/svg/twitter.svg?inline'
import DribbbleIcon from '~/assets/svg/dribbble.svg?inline'
import PinterestIcon from '~/assets/svg/pinterest.svg?inline'
import InstagramIcon from '~/assets/svg/instagram.svg?inline'

import NoiseImage from '~/assets/image/noise.png'

export default {
  name: 'GlobalFooter',

  components: {
    FacebookIcon,
    TwitterIcon,
    DribbbleIcon,
    PinterestIcon,
    InstagramIcon
  },

  data() {
    return {
      noiseImage: NoiseImage
    }
  },

  computed: {
    settings() {
      const settings = this.$store.get('settings/settings')
      return settings
    },

    year() {
      return new Date().getFullYear()
    },

    copyright() {
      const copy = get(this.settings, 'footerCopyrightText', '')
      return copy.replace('{year}', this.year)
    }
  }
}
</script>

<style lang="stylus">
.GlobalFooter
  .noise
    .vv-image
      background-repeat repeat

  @keyframes gradient {
    0% {
      opacity 0.5
      background-position 0% 50%
    }
    50% {
      opacity 0.25
      background-position 50% 50%
    }
    100% {
      opacity 0.75
      background-position 100% 50%
    }
  }

  @keyframes gradient-one {
    0% {
      background-size 100%
    }
    50% {
      background-size 150%
    }
    100% {
      background-size 200%
    }
  }

  animation gradient-one 5s ease infinite alternate
  background-image radial-gradient(circle at 19% -13%,
    theme('colors.lightpurple'), theme('colors.purple'), theme('colors.pink'), theme('colors.red'),
    theme('colors.lightpurple'))

  // @media(max-width tablet)
  //   background-image radial-gradient(circle at -21% -25%, theme('colors.green'), theme('colors.lime'), theme('colors.pink'), theme('colors.red'), theme('colors.purple'))


  .second-gradient
    animation gradient 5s ease infinite alternate
    background-size 200%
    opacity 0.5
    background-image radial-gradient(circle at 75% 50%, theme('colors.green'), theme('colors.lime'), theme('colors.pink'), theme('colors.red'), theme('colors.purple'))

    // @media(max-width tablet)
    //   background-image linear-gradient(theme('colors.green'), theme('colors.lime'), theme('colors.pink'), theme('colors.red'), theme('colors.purple'))

  .socials
    @media(min-width (tablet + 1px))
      flex 0 0 210px
  a
    +whenActive()
      svg
        path
          fill white !important

  svg
    width 19px
    height 19px
    display inline-block

    path
      fill theme('colors.offblack') !important
      default-transition fill, time-fast

      @media(max-width tablet)
        fill white !important
</style>
