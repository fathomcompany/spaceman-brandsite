<!--
ContactForm
-->

<template lang="pug">
.ContactForm.bg-cover.bg-center.h-gutter.flex.relative.overflow-hidden

  ResponsiveMedia.absolute.inset-0.bottom-m10vh(
    v-parallax="0.2"
    v-if="block.imageBackground || block.videoBackground"
    background="cover"
    :image="block.imageBackground"
    :video="block.videoBackground"
    :fill="true"
  )

  .content.top-gutter-small.bottom-gutter-huge.relative

    MaskedBuildin(v-if="block.heading")
      h2.h1.pb-8(v-html="block.heading")

    .md_flex.justify-between
      MaskedBuildin.column.md_w-43p.relative

        transition(name="fade-up")
          p.p.whitespace-pre(
            v-if="formSubmitted && thankYouMessage"
            v-html="thankYouMessage"
            key="message"
          )

          form(
            v-if="!formSubmitted"
            ref="form"
            name="contact"
            method="POST"
            netlify
            netlify-honeypot="bot-field"
            @submit.prevent="handleSubmit"
            key="form"
          )

            //- Hidden input to check for bots
            input(type="hidden" name="form-name" value="contact")

            div
              label Name
              input(
                type="text"
                name="name"
                required
                placeholder="Your Name*"
                v-model="formFields.name"
                maxlength="40"
                :disabled="xhrStarted"
              )
            div
              label Email Address
              input(
                type="email"
                name="email"
                required
                placeholder="Email Address*"
                v-model="formFields.email"
                maxlength="50"
                :disabled="xhrStarted"
              )
            div
              label Phone Number
              input(
                type="phone"
                name="phone"
                :disabled="xhrStarted"
                placeholder="Phone Number"
                v-model="formFields.phone"
                maxlength="25"
              )
            div
              label Message
              textarea(
                name="message"
                placeholder="Message"
                v-model="formFields.message"
                maxlength="1000"
                :disabled="xhrStarted"
              )
            div.pt-6
              button(
                type="submit"
                :disabled="xhrStarted"
              ) Send

            transition(name="fade-up")
              p.text-red.mt-8.uppercase.text-bold.text-base.tracking-wider(v-if="formError") The message could not be sent. Please check the fields and try again.

      .column.mt-20.md_w-43p.md_mt-0
        ContentfulRichText(
          :delay="600"
          :content="block.sideContent"
          formatting="contact"
        )

</template>

<script>
import get from 'lodash.get'
import { timeout } from '~/utils/timing'

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
      // Post data to Netlify function
      endpoint: `${process.env.BASE_URL}/.netlify/functions/send-contact-email`,

      // Form field values
      formFields: {
        email: '',
        name: '',
        phone: '',
        message: ''
      },

      // When sending data, lock the form
      xhrStarted: false,

      // After successfull submission
      formSubmitted: false,

      // Form couldn't be submitted for some reason
      formError: false
    }
  },

  computed: {
    thankYouMessage() {
      return get(
        this,
        'block.thankYouMessage',
        "Message sent! We'll get back to you soon."
      )
    }
  },

  methods: {
    async handleSubmit(e) {
      // Don't allow double posting
      if (this.xhrStarted) return

      this.formError = false
      this.xhrStarted = true

      if (process.env.NODE_ENV === 'development') {
        console.log('starting debug post')
        await timeout(1000)
        console.log('ending debug post')
        this.xhrStarted = false
        // this.formSubmitted = true
        this.formError = true
        return
      }

      try {
        const res = await this.$axios.post(this.endpoint, this.formFields)
        console.log(res)
        this.xhrStarted = false
        this.formSubmitted = true
      } catch (e) {
        console.log(e)
        this.xhrStarted = false
        this.formError = true
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.ContactForm
  aspect-ratio (16/9), false
</style>
