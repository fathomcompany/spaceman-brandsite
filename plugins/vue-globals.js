import Vue from 'vue'
import VueVisual from 'vue-visual'
import MaskedBuildin from '~/components/shared/MaskedBuildin'
import 'vue-visual/index.css'

Vue.component('visual', VueVisual).options.setDefaults({
  load: 'visible',
  loadPoster: true,
  transition: 'vv-fade',
  inViewportRootMargin: '1500px 0%'
})

Vue.component('MaskedBuildin', MaskedBuildin)
