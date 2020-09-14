import Vue from 'vue'

import VueVisual from 'vue-visual'
import 'vue-visual/index.css'

Vue.component('visual', VueVisual).options.setDefaults({
  load: 'visible',
  loadPoster: true,
  transition: 'vv-fade',
  inViewportRootMargin: '1500px 0%'
})
