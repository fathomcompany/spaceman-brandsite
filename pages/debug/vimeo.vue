<!--
VimeoDebug
-->

<template>
  <div class="VimeoDebug">
    <p>SPACEMAN VIDEO</p>
    <iframe
      id="player"
      scrolling="no"
      frameborder="0"
      width="640"
      height="480"
      src="https://player.vimeo.com/video/497349289"
      allowfullscreen="true"
    ></iframe>

    <p><br />PUBLIC VIDEO</p>
    <iframe
      id="player"
      scrolling="no"
      frameborder="0"
      width="640"
      height="480"
      src="https://player.vimeo.com/video/273405351"
      allowfullscreen="true"
    ></iframe>

    <p><br />VIMEO SDK PLAYER, SPACEMAN VIDEO</p>
    <div
      style="position: relative; overflow: hidden; width: 640px; height: 480px;"
    >
      <VimeoPlayer playerID="spaceman1" url="https://vimeo.com/497349289" />
    </div>

    <p><br />VIMEO SDK PLAYER, PUBLIC VIDEO</p>
    <div
      style="position: relative; overflow: hidden; width: 640px; height: 480px;"
    >
      <VimeoPlayer playerID="public1" url="https://vimeo.com/273405351" />
    </div>
  </div>
</template>

<script>
import VimeoPlayer from '~/components/shared/VimeoPlayer'

export default {
  name: 'VimeoDebug',

  components: { VimeoPlayer }
}
</script>

<style lang="stylus" scoped>
.VimeoDebug
  //
</style>
