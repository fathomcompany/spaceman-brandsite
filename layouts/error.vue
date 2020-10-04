<template lang="pug">
#main
  Blocks(:blocks='blocks')

</template>

<script>
import get from 'lodash.get'

import Blocks from '~/components/Blocks'

export default {
  components: {
    Blocks
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
