import Vue from 'vue'
import inViewportDirective from 'vue-in-viewport-directive'
import balanceTextDirective from 'vue-balance-text'
import VueParallaxJs from 'vue-parallax-js'
import objectFitPolyfill from 'objectFitPolyfill' // eslint-disable-line
import smoothscroll from 'smoothscroll-polyfill'
import { VueMasonryPlugin } from 'vue-masonry'

smoothscroll.polyfill()

require('intersection-observer')

Vue.directive('in-viewport', inViewportDirective)
Vue.directive('balance-text', balanceTextDirective)

Vue.use(VueMasonryPlugin)
Vue.use(VueParallaxJs)

// Browser detection
window.isIE11 = !!window.MSInputMethodContext && !!document.documentMode
if (window.isIE11) {
  document.getElementById('__nuxt').classList.add('ie11')
}
