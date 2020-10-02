<!--
GlobalHeader
-->

<template lang="pug">
header.GlobalHeader.fixed.flex.justify-center.z-header.items-center.pointer-events-none.user-select-none(
  :class="[state]"
)
  .bottom-screen.absolute.inset-x-0.top-0.bg-gradient-to-b.frtoom-transparent.from-black.opacity-50.h-20.pointer-events-none

  .cover-screen.bg-black.absolute.inset-0.origin-top

  .content-wide.text-center.tracking-widest.pt-5.md_pt-8
    h1.ml-4
      span.inline-block(v-for='(letter,n) in "SPACEMAN"') {{ letter }}
</template>

<script>
export default {
  name: 'GlobalHeader',

  data() {
    return {
      state: 'ready',
      timeoutID: null
    }
  },

  mounted() {
    if (!window || typeof window === 'undefined') return
    this.timeoutID = setTimeout(this.setIntro, 100)
  },

  destroyed() {
    clearTimeout(this.timeoutID)
  },

  methods: {
    setReady() {
      this.state = 'ready'
      this.timeoutID = setTimeout(this.setIntro, 3000)
    },
    setIntro() {
      this.state = 'intro'

      this.timeoutID = setTimeout(this.reset, 2000)
    },
    reset() {
      this.state = 'default'

      this.$store.set('global/introFinished', true)

      // if (process.env.NODE_ENV === 'development')
      //   this.timeoutID = setTimeout(this.setReady, 2000)
    }
  }
}
</script>

<style lang="stylus" scoped>
.GlobalHeader
  default-transition height, 1.1s, balanced
  @apply top-0 inset-x-0 h-12;

  &.initial,
  &.ready,
  &.intro
    @apply h-screen;


  // TRANSITIONS
  h1
    transition letter-spacing 3s smooth-in-out, font-size 1.5s smooth-in

  span
    for num in (1..8)
      &:nth-of-type({num})
        default-transition opacity transform, 1s, balanced

  .cover-screen
    default-transition transform, 1.2s, balanced
    // opacity 0.5

  // PRE BUILD IN
  &.ready
    h1
      @apply text-5xl tracking-tighter;
      letter-spacing 0


      @media(max-width tablet)
        @apply text-3xl;

    span
      opacity 0
      // transform translateY(5px)

  // BUILD IN
  &.intro

    h1
      @apply text-5xl;
      @apply tracking-superwide;

      @media(max-width tablet)
        @apply text-3xl;

      span
        opacity 1
        transform none

  &.default
    .cover-screen
      transform scaleY(0)

    h1
      transition letter-spacing 1s smooth-in-out, font-size 1s smooth-in
</style>
