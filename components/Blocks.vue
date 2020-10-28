<!--

Blocks

Dynamic components that make up a content page

-->

<template lang="pug">
.Blocks: component(
	v-for='(block, index) in createdBlocks'
	:is='block.sys.contentType.sys.id'
	:key='block.sys.id + index'
	:block='block')

</template>

<script>
import get from 'lodash.get'

import ContactForm from '~/components/blocks/ContactForm'
import LogoGarden from '~/components/blocks/LogoGarden'
import HeadingContent from '~/components/blocks/HeadingContent'
import Slider from '~/components/blocks/Slider'
import Marquee from '~/components/blocks/Marquee'
import GradientHeading from '~/components/blocks/GradientHeading'
import Reel from '~/components/blocks/Reel'
import DigitalCampaigns from '~/components/blocks/DigitalCampaigns'
import ImmersiveExperiences from '~/components/blocks/ImmersiveExperiences'
import MobileFirstContent from '~/components/blocks/MobileFirstContent'
import ProjectMarquee from '~/components/blocks/ProjectMarquee'
import MediaGrid from '~/components/blocks/MediaGrid'

// List of block components
// Key is the API ID of the content type
// Value is the Vue component to render for this block type
const blocks = {
  blockLogoGarden: LogoGarden,
  blockProjectSlider: Slider,
  blockHeadingContent: HeadingContent,
  blockContactForm: ContactForm,
  blockMobileFirstContent: MobileFirstContent,
  blockImmersiveExperiences: ImmersiveExperiences,
  blockCampaignDeviceScreens: DigitalCampaigns,
  blockReel: Reel,
  blockGradientHeading: GradientHeading,
  blockMarquee: Marquee,
  blockProjectMarquee: ProjectMarquee,
  blockMediaGrid: MediaGrid,
  blockMediaGridCombination: MediaGrid
}

// Export just the list of keys
export const keys = Object.keys(blocks)

export default {
  name: 'Blocks',

  // Block components
  components: {
    ...blocks
  },

  props: {
    blocks: {
      type: Array,
      default() {
        return []
      }
    }
  },

  computed: {
    // Filter the blocks to those that have been defined.  To fix errors in dev
    // environments after content model is created but commits with the new
    // block component have not been pulled down.
    createdBlocks() {
      return this.blocks.filter((block) => {
        // Try to get hte key of the block type
        // This will be undefined if the block isn't published
        const key = get(block, 'sys.contentType.sys.id')

        // Esnure that a Vue component is registered for the block type
        return keys.includes(key)
      })
    }
  }
}

/**
 * Shared mixin for all block components
 */
export const BlockMixin = {
  props: {
    block: {
      type: Object,
      required: true
    }
  }
}

/**
 * Async load block data, if they need to hydrate server-side
 */
export const loadBlockData = (context, pageBlocks = [], extra) => {
  Promise.all(
    pageBlocks.map((block) => {
      // Get the block type id
      const type = get(block, 'sys.contentType.sys.id')

      // Check for an async function
      if (Object.prototype.hasOwnProperty.call(blocks, type)) {
        const func = get(blocks[type], 'asyncData')
        if (func) {
          return func(context, block, extra)
        }
      }

      Promise.resolve()
    })
  )
}
</script>

<style lang="stylus" scoped>
.Blocks
  //
</style>
