<!--
Slider
-->

<template lang="pug">
.Slider.relative(v-if="block.projects && block.projects.length")
  Hooper(
    :settings="hooperSettings"
    ref="hooper"
  )
    Slide.slide.cursor-grab(v-for="(project, index) in block.projects" :key="index")
      .slide-content.bg-cover.bg-center.relative.overflow-hidden.bg-offblack

        ResponsiveMedia(
          v-if="project.imageListing"
          :image="project.imageListing"
          :fill="true"
          background="cover"
        )

        .bottom-screen.absolute.inset-0.bg-gradient-to-b.from-transparent.to-black.opacity-50

        .absolute.inset-0.flex.items-end.justify-center.p-8.md_p-12.text-center(
          v-if="project.titleListing"
        )
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
      hooperSettings: {
        infiniteScroll: true,
        wheelControl: false,
        itemsToShow: 1.5,
        centerMode: true,
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

  mounted() {
    if (!window || typeof window === 'undefined') return

    // To force the responsive image to be the correct size
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
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
