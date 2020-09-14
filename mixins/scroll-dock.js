const MOBILE_DOCK_THRESHOLD = 20

export default {
  data() {
    return {
      scrollingDown: false,
      lastScrollPosition: 0
    }
  },

  created() {
    if (typeof window === 'undefined') return

    this.$win.on('scroll', this.checkDocked)
    this.$win.on('resize', this.checkDocked)
  },

  destroyed() {
    this.$win.off('scroll', this.checkDocked)
  },

  methods: {
    checkDocked(e) {
      const current = window.pageYOffset

      if (
        window.pageYOffset <= MOBILE_DOCK_THRESHOLD ||
        this.lastScrollPosition - current >= MOBILE_DOCK_THRESHOLD
      ) {
        this.lastScrollPosition = current
        this.scrollingDown = false
      } else if (
        this.lastScrollPosition - current <=
        MOBILE_DOCK_THRESHOLD * -1
      ) {
        this.scrollingDown = true
        this.lastScrollPosition = current
      }
    }
  }
}
