<!--
Slider
-->

<template lang="pug">
.Slider.relative(v-if="block.projects && block.projects.length")
  Hooper(
    :settings="hooperSettings"
    @slide="handleSlideChange"
    ref="hooper"
  )
    Slide.slide(v-for="(project, index) in block.projects" :key="index")
      .slide-content.bg-cover.bg-center.relative.overflow-hidden.bg-offblack

        ResponsiveMedia.project-image(
          v-if="project.imageListing"
          :image="project.imageListing"
          :fill="true"
          background="cover"
        )

        .bottom-screen.absolute.inset-0.bg-gradient-to-b.from-transparent.to-black.opacity-50

        .lighten-screen.absolute.inset-0.bg-white

        .absolute.inset-0.flex.items-end.justify-center.p-8.md_p-12.text-center(
          v-if="project.titleListing"
        )

          nuxt-link.absolute.inset-0(:to="`/project/${project.path}`")

          .max-w-sm
            MaskedBuildin.project-title.inline-block
              nuxt-link.inline-block(:to="`/project/${project.path}`")
                h3.h15(v-html="replaceNewLines(project.titleListing)")

        //- a.absolute.inset-0.cursor-pointer(
        //-   :href="`/project/${project.path}`"
        //-   @click.stop.prevent="onLinkClick(`/project/${project.path}`)"
        //- )

  //- Previous
  .pagination.prev.cursor-pointer.p-4.left-0.ml-2.select-none.absolute.transform.translate-y-minus50p.top-50p(@click="$refs.hooper.slidePrev()")
    img(src="~assets/image/slider-arrow.png")

  //- Next
  .pagination.next.cursor-pointer.p-4.right-0.mr-2.select-none.absolute.transform.translate-y-minus50p.top-50p(@click="$refs.hooper.slideNext()")
    img.transform.origin-center.rotate-180(src="~assets/image/slider-arrow.png")
</template>

<script>
import { Hooper, Slide } from 'hooper'
import Cookies from 'js-cookie'
import get from 'lodash.get'

/*! purgecss start ignore */
import 'hooper/dist/hooper.css'
/*! purgecss start ignore */

import ResponsiveMedia from '~/components/shared/ResponsiveMedia'

export default {
  name: 'Slider',

  components: {
    Hooper,
    Slide,
    ResponsiveMedia
  },

  props: {
    block: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      isDragging: false,

      shortDrag: false,

      ready: false,

      hooperSettings: {
        // transition: 600,
        infiniteScroll: true,
        wheelControl: false,
        itemsToShow: 1.5,
        centerMode: true,
        mouseDrag: false,
        breakpoints: {
          // Above tablet
          767: {
            itemsToShow: 3,
            centerMode: false
          }
        }
      }
    }
  },

  computed: {
    slideCount() {
      return get(this, 'block.projects.length')
    },

    saveKey() {
      return `SLIDER_${this.$route.path}`
    }
  },

  mounted() {
    if (!window || typeof window === 'undefined') return

    const initialSlide = Cookies.get(this.saveKey) || 0

    if (initialSlide !== 0) {
      this.$refs.hooper.slideTo(parseInt(initialSlide))
    }

    // To force the responsive image to be the correct size
    setTimeout(() => {
      if (typeof window.dispatchEvent === 'undefined') return

      window.dispatchEvent(new Event('resize'))
      this.ready = true
    }, 200)
  },

  methods: {
    replaceNewLines(string) {
      if (!string) return ''
      return string.replace(/\n/gi, '<br/>')
    },

    onLinkClick(path) {
      if (this.$refs.hooper.isSliding) return

      this.$router.push({
        path
      })
    },

    handleSlideChange({ currentSlide, slideFrom }) {
      if (!this.ready) return

      if (currentSlide < 0) currentSlide = this.slideCount

      Cookies.set(this.saveKey, currentSlide)
    }
  }
}
</script>

<style lang="stylus" scoped>
.hooper
  outline none
  height auto !important

.slide-content
  padding-bottom 160%

.slide
  &:hover
    .lighten-screen
      opacity 0.15

.lighten-screen
  default-transition opacity, time-slow
  opacity 0

.pagination
  max-width 50px
  default-transition transform, time-reg

  &:hover
    transform translateY(-50%) scale(1.1)

  &:active
    transform translateY(-50%) scale(1)

.project-title
  default-transition transform, time-reg, smooth-in-out

  a
    default-transition transform, time-reg, smooth-in-out

  a:active
    transform scale(0.95)

  &:hover
    transform scale(1.05)
</style>

<style lang="stylus">
.ie11 .Slider
  .pagination.next img
    transform rotate(180deg)
</style>
