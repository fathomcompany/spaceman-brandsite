<!--
ContactForm
-->

<template lang="pug">
.ContactForm.bg-cover.bg-center.h-gutter.flex
  .content.v-gutter
    h2.h1.pb-6 contact us

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
            input(type="phone" name="phone" required placeholder="Phone Number*")
          div
            label Message
            textarea(name="message" placeholder="Message")
          div.pt-6
            button(type="submit") Send

      .column.mt-20.md_w-43p.md_mt-0
        h3.h3 SPACEMAN Studios

        p
          span 500 Bishop Street, Suite A6
          br
          span Atlanta, GA 30318

        p (+1) 678-250-5025

        p info@spacemanmedia.com

</template>

<script>
export default {
  name: 'ContactForm'
}
</script>

<style lang="stylus" scoped>
.ContactForm
  background-image url('https://p76.f0.n0.cdn.getcloudapp.com/items/YEuo9oG6/Image%202020-09-15%20at%203.15.39%20PM.png?v=abbc19be9d441dc68ee29aa9db5b41ef')
  aspect-ratio 1.4/1, false

p
  fluid font-size, 18, 16
  @apply mb-5;
  bold()
</style>
