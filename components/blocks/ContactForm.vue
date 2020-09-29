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
        form(
          ref="form"
          name="contact"
          method="POST"
          netlify
          netlify-honeypot="bot-field"
          @submit.prevent="handleSubmit"
        )
          //- Hidden input to check for bots
          input(type="hidden" name="form-name" value="contact")

          div
            label Name
            input(type="text" name="name" required placeholder="Your Name*" v-model="formFields.name")
          div
            label Email Address
            input(type="email" name="email" required placeholder="Email Address*" v-model="formFields.email")
          div
            label Phone Number
            input(type="phone" name="phone" required placeholder="Phone Number" v-model="formFields.phone")
          div
            label Message
            textarea(name="message" placeholder="Message" v-model="formFields.message")
          div.pt-6
            button(
              type="submit"
            ) Send

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
  },

  data() {
    return {
      endpoint:
        process.env.NODE_ENV === 'development'
          ? 'http://localhost:53644/.netlify/functions/send-contact-email'
          : `${process.env.BASE_URL}/.netlify/functions/send-contact-email`,
      formFields: {
        email: 'email@email.com',
        name: 'name!',
        phone: 'phone!',
        message: 'message!'
      }
    }
  },

  methods: {
    async handleSubmit(e) {
      try {
        const res = await this.$axios.post(this.endpoint, this.formFields)
        console.log(res)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.ContactForm
  aspect-ratio 1.4/1, false
</style>
