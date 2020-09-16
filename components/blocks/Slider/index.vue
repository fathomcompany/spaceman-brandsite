<!--
Slider
-->

<template lang="pug">
.Slider
  Hooper(
    :settings="hooperSettings"
  )
    Slide.slide(v-for="(slide, index) in slides" :key="index")
      .slide-content.bg-cover.bg-center
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
          },

          1400: {
            itemsToShow: 3.2
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
.Slider
  //

.hooper
  outline none
  height auto !important

.slide
  width 500px

.slide-content
  padding-bottom 160%
  background-image url('https://p76.f0.n0.cdn.getcloudapp.com/items/8LuPLklG/Image%202020-09-16%20at%204.17.42%20PM.png?v=d9062dc084a3430a8d6dcb484c5ab12c')
</style>
