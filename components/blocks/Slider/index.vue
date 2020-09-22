<!--
Slider
-->

<template lang="pug">
.Slider.relative.cursor-grab
  Hooper(
    :settings="hooperSettings"
    ref="hooper"
  )
    Slide.slide(v-for="(slide, index) in slides" :key="index")
      .slide-content.bg-cover.bg-center.relative
        .absolute.inset-0.flex.items-end.justify-center.p-8.md_p-12.text-center
          .max-w-sm
            h3.h2 Gordon Ramsay: Uncharted

        nuxt-link.absolute.inset-0(to="/project/gordon-ramsay-uncharted")

  //- Previous
  .pagination.prev.cursor-pointer.p-4.left-0.select-none.absolute.transform.translate-y-minus50p.top-50p(@click="$refs.hooper.slidePrev()")
    img(src="~assets/image/slider-arrow.png")

  //- Next
  .pagination.next.cursor-pointer.p-4.right-0.select-none.absolute.transform.translate-y-minus50p.top-50p(@click="$refs.hooper.slideNext()")
    img.transform.origin-center.rotate-180(src="~assets/image/slider-arrow.png")
</template>

<script>
import { Hooper, Slide } from 'hooper'
import 'hooper/dist/hooper.css'

export default {
  name: 'Slider',

  components: {
    Hooper,
    Slide
  },

  props: {
    block: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      hooperSettings: {
        infiniteScroll: true,
        wheelControl: false,
        itemsToShow: 1.5,
        centerMode: true,
        breakpoints: {
          // Above tablet
          767: {
            itemsToShow: 2.6,
            centerMode: false
          }
        }
      }
    }
  },

  computed: {
    slides() {
      return Array.from({ length: 8 })
    }
  }
}
</script>

<style lang="stylus" scoped>
.hooper
  outline none
  height auto !important

.slide
  width 500px

.slide-content
  padding-bottom 160%
  background-image url('https://p76.f0.n0.cdn.getcloudapp.com/items/8LuPLklG/Image%202020-09-16%20at%204.17.42%20PM.png?v=d9062dc084a3430a8d6dcb484c5ab12c')

.pagination
  max-width 50px
  default-transition transform, time-reg

  &:hover
    transform translateY(-50%) scale(1.1)

  &:active
    transform translateY(-50%) scale(1)
</style>
