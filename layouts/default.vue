<template lang="pug">
#main
  .wrapper
    GlobalHeader

    nuxt

    GlobalFooter

</template>

<script>
import GlobalHeader from '~/components/global/Header'
import GlobalFooter from '~/components/global/Footer'

export default {
  components: { GlobalHeader, GlobalFooter },

  mounted() {
    if (!window || typeof window === 'undefined') return

    window.onbeforeunload = function() {
      localStorage.clear()
      return ''
    }
  }
}
</script>

<style lang="stylus">
#main
  //
</style>
