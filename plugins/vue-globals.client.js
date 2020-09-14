import Vue from 'vue'
import inViewportDirective from 'vue-in-viewport-directive'

require('intersection-observer')

Vue.directive('in-viewport', inViewportDirective)
