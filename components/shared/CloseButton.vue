<!--
CloseButton
-->

<template lang="pug">
.CloseButton.absolute.right-0.top-0.text-6xl.font-hairline.z-50.w-12
  nuxt-link(to="/") &#215;
</template>

<script>
export default {
  name: 'CloseButton'
}
</script>

<style lang="stylus" scoped>
.CloseButton
  //
</style>
