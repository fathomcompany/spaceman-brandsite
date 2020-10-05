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
  components: { GlobalHeader, GlobalFooter }
}
</script>

<style lang="stylus">
#main
  //
</style>
