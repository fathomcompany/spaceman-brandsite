/**
 * Creates a browser-side check for webp support.
 *
 * Accessible in Nuxt as `this.$webp`
 *
 * Can be used in scrits by importing `{ hasWebp }`
 */
export const hasWebp =
  typeof document !== 'undefined'
    ? document
        .createElement('canvas')
        .toDataURL('image/webp')
        .indexOf('data:image/webp') === 0
    : false

export default ({ app }, inject) => {
  inject('webp', hasWebp)
}
