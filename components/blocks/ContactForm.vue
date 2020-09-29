<!--
ContactForm
-->

<template lang="pug">
.ContactForm.bg-cover.bg-center.h-gutter.flex.relative

  ResponsiveMedia.absolute.inset-0(
    v-if="block.imageBackground"
    background="cover"
    :image="block.imageBackground"
    :video="block.videoBackground"
    :fill="true"
  )

  .content.v-gutter.relative

    h2.h1.pb-8(v-if="block.heading" v-html="block.heading")

    .md_flex.justify-between
      .column.md_w-43p
        form(name="contact" method="POST" data-netlify="true")
          div
            label Name
            input(type="text" name="name" required placeholder="Your Name*")
          div
            label Email Address
            input(type="email" name="email" required placeholder="Email Address*")
          div
            label Phone Number
            input(type="phone" name="phone" required placeholder="Phone Number")
          div
            label Message
            textarea(name="message" placeholder="Message")
          div.pt-6
            button(type="submit") Send

      .column.mt-20.md_w-43p.md_mt-0
        ContentfulRichText(:content="block.sideContent" formatting="contact")

</template>

<script>
import ContentfulRichText from '~/components/contentful/RichText'
import ResponsiveMedia from '~/components/shared/ResponsiveMedia'

export default {
  name: 'ContactForm',

  components: { ContentfulRichText, ResponsiveMedia },

  props: {
    block: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="stylus" scoped>
.ContactForm
  aspect-ratio 1.4/1, false
</style>
