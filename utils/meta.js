import { seo } from 'bukwild-contentful-utils'
import get from 'lodash.get'

export function makeMeta(meta, defaults = {}) {
  const data = seo({ fields: meta }, defaults)

  const hasDescription = get(meta, 'description')
  const description = get(
    meta,
    'description',
    'Multi-dimensional concept, media creation and strategy for premium brands and entertainment networks.'
  )

  if (!hasDescription) {
    data.meta.push({
      hid: 'description',
      name: 'description',
      content: description
    })
  }

  data.meta.push({
    hid: 'og:description',
    name: 'og:description',
    content: description
  })

  return data
}
