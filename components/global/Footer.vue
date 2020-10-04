<!--

GlobalFooter

-->

<template lang="pug">
footer.GlobalFooter.pt-24.pb-12.md_py-10.h-gutter

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

export default {
  name: 'GlobalFooter',

  components: {
    FacebookIcon,
    TwitterIcon,
    DribbbleIcon,
    PinterestIcon,
    InstagramIcon
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
      const copy = get(this.settings, 'footerCopyrightText')

      return copy.replace('{year}', this.year)
    }
  }
}
</script>

<style lang="stylus">
@keyframes whoosh {
    0% { background-position-x: 0 }
    100% { background-position-x: 100% }
  }

.GlobalFooter
  background-image radial-gradient(circle at 19% -13%, theme('colors.green'), theme('colors.lime'), theme('colors.pink'), theme('colors.red'), theme('colors.purple'))

  @media(max-width tablet)
    background-image radial-gradient(circle at -21% -25%, theme('colors.green'), theme('colors.lime'), theme('colors.pink'), theme('colors.red'), theme('colors.purple'))


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
