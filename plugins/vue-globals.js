import Vue from 'vue'
import VueVisual from '~/components/shared/Visual'
import MaskedBuildin from '~/components/shared/MaskedBuildin'
import 'vue-visual/index.css'

Vue.component('visual', VueVisual).options.setDefaults({
  load: 'visible',
  autopause: 'visible',
  autoplay: 'visible',
  loadPoster: true,
  transition: 'vv-fade',
  inViewportRootMargin: '2000px 0%'
})

Vue.component('MaskedBuildin', MaskedBuildin)
