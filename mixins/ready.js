export default {
  data() {
    return {
      ready: false
    }
  },

  mounted() {
    this.$nextTick(() => (this.ready = true))
  }
}
