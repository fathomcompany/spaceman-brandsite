<!--

GlobalFooter

-->

<template lang="pug">
footer.GlobalFooter Footer
</template>

<script>
import get from 'lodash.get'

import Blocks from '~/components/Blocks'

export default {
  name: 'GlobalFooter',

  components: { Blocks },

  computed: {
    settings() {
      const settings = this.$store.get('settings/settings')
      return settings
    },

    blocks() {
      return get(this.settings, 'blocks')
    },

    year() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style lang="stylus" scoped>
.GlobalFooter
  //
</style>
