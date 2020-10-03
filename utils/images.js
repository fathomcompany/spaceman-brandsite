import contentful from 'bukwild-contentful-utils'
import get from 'lodash.get'
import { hasWebp } from '~/plugins/webp.client'

const IMAGE_SIZES = [100, 300, 375, 768, 1024, 1500, 1920]

/**
 * Returns a vue visual srcset from a Contentful media object
 * @param {Contentful Image Object} image
 */
export const makeSrc = (image) => {
  if (!image) return null

  if (typeof image === 'string') return image

  const format = hasWebp ? 'webp' : null
  let pixelDensity = 1

  if (typeof window !== 'undefined') {
    if (window.devicePixelRatio) {
      pixelDensity = 1.5 // window.devicePixelRatio
    }
  }

  const srcSet = {}
  for (let i = 0; i < IMAGE_SIZES.length; i++) {
    srcSet[IMAGE_SIZES[i]] = contentful.img(
      image,
      IMAGE_SIZES[i] * pixelDensity,
      null,
      {
        format
      }
    )
  }
  return srcSet
}

/**
 * Attempts to retrieve the image title field from a Contentful image
 * @param {Object} image
 */
export const getAlt = (image) => {
  if (!image) return null
  return get(image, 'fields.title')
}
