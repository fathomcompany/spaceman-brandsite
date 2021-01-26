<!--
GlobalHeader
-->

<template lang="pug">
header.GlobalHeader.flex.justify-center.items-center.pointer-events-none.user-select-none.w-100vw(
  :class="[state, position, { animheight: isPage }]"
)
  .bottom-screen.absolute.inset-x-0.top-0.bg-gradient-to-b.frtoom-transparent.from-black.opacity-50.h-20.pointer-events-none

  .content-wide.text-center.tracking-widest.pt-5.md_pt-8.mx-0
    h1.ml-2
      span.inline-block(v-for='(letter,n) in "SPACEMAN"') {{ letter }}
</template>

<script>
export default {
  name: 'GlobalHeader',

  data() {
    return {
      state: 'dontshow',
      timeoutID: null,
      position: this.isPage ? 'absolute' : 'fixed',
      hasBeenAnimated: false
    }
  },

  computed: {
    isPage() {
      return !this.$route.path.includes('/project/')
    }
  },

  mounted() {
    if (!window || typeof window === 'undefined') return

    this.$win.on('scroll', this.onScroll, { throttle: 1 })
    this.timeoutID = setTimeout(this.setReady, 1000)
    this.onScroll()
  },

  destroyed() {
    clearTimeout(this.timeoutID)
  },

  methods: {
    setReady() {
      if (!this.isPage) {
        this.state = 'default'
        return
      } else {
        this.state = 'ready'
      }
      this.timeoutID = setTimeout(this.setIntro, 100)
    },
    setIntro() {
      this.state = 'intro'

      // this.timeoutID = setTimeout(this.reset, 2000)
    },
    reset() {
      this.state = 'default'

      this.$store.set('global/introFinished', true)

      // if (process.env.NODE_ENV === 'development')
      //   this.timeoutID = setTimeout(this.setReady, 2000)
    },

    onScroll() {
      if (window.scrollY > 0) {
        this.position = 'fixed'

        if (!this.hasBeenAnimated) {
          clearInterval(this.timeoutID)
          this.hasBeenAnimated = true
          this.state = 'default'
          this.$win.off('scroll', this.onScroll)
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.GlobalHeader
  @apply top-0 inset-x-0 h-12;
  z-index 49
  default-transition z-index opacity, 1.1s, balanced

  &.dontshow
    default-transition opacity, time-reg, balanced
    opacity 0

  &.default
    default-transition height z-index opacity, 1.1s, balanced

  &.initial,
  &.ready,
  &.intro
    @media(min-width tablet + 1px)
      @apply h-screen;

    @media(max-width tablet)
      height 80vh


  // TRANSITIONS
  h1
    transition letter-spacing 3s smooth-in-out, font-size 1.5s smooth-in

  span
    for num in (1..8)
      &:nth-of-type({num})
        default-transition opacity transform, 1s, balanced

  // PRE BUILD IN
  &.ready
    z-index 51
    h1
      @apply text-5xl tracking-tighter;
      letter-spacing 0


      @media(max-width tablet)
        @apply text-3xl;

    span
      opacity 0

  // BUILD IN
  &.intro
    z-index 51

    h1
      @apply text-5xl;
      @apply tracking-superwide;

      @media(max-width tablet)
        @apply text-3xl;

      span
        opacity 1
        transform none

  &.default

    h1
      transition letter-spacing 1s smooth-in-out, font-size 1s smooth-in
</style>
