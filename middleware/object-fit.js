export default function(context) {
  if (!process.client) return

  if (!window || typeof window === 'undefined') return

  if (!window.isIE11) return

  setTimeout(() => {
    const $videos = document.querySelectorAll('video.vv-background-cover')
    window.objectFitPolyfill($videos)
  }, 1000)
}
