<template lang="pug">
#main
  Blocks(:blocks='blocks')

  GlobalFooter

</template>

<script>
import get from 'lodash.get'

import Blocks from '~/components/Blocks'
import GlobalFooter from '~/components/global/Footer'

export default {
  components: {
    Blocks,
    GlobalFooter
  },

  props: {
    error: {
      type: Object,
      default: () => {}
    }
  },

  computed: {
    settings() {
      const settings = this.$store.get('settings/settings')
      return settings
    },

    blocks() {
      return get(this.settings, 'unknownPageContent.content', [])
    }
  }
}
</script>

<style lang="stylus"></style>
