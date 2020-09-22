import Vue from 'vue'
import inViewportDirective from 'vue-in-viewport-directive'
import balanceTextDirective from 'vue-balance-text'

import smoothscroll from 'smoothscroll-polyfill'

smoothscroll.polyfill()

require('intersection-observer')

Vue.directive('in-viewport', inViewportDirective)
Vue.directive('balance-text', balanceTextDirective)
