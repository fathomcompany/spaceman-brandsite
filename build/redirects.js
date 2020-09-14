/**
 * Dynamically generate _redirects file from Contentful Redirect entries.
 */

import { resolve } from 'path'
import { config } from 'bukwild-contentful-utils'
const fs = require('fs')

const path = resolve(__dirname, '../static', '_redirects')

config({
  space: process.env.CONTENTFUL_SPACE,
  access_token: process.env.CONTENTFUL_API,
  host: process.env.CONTENTFUL_HOST
})

module.exports = function() {
  this.nuxt.hook('build:before', generateRedirects)
}

/**
 * Pull redirect entries fron contentful to generate Netlify's
 * `_redirects` file in the static directory
 * See: https://docs.netlify.com/routing/redirects/
 */
function generateRedirects(builder) {
  // Only run if generating on netlify (which adds a DEPLOY_URL env)
  if (
    process.env.npm_lifecycle_event === 'generate' &&
    process.env.DEPLOY_URL
  ) {
    console.log('=======BUILDING REDIRECTS FROM CONTENTFUL========')

    let contents = ''

    // Set up a wildcard route so the staing SPA can find unpublished content pages
    if (process.env.NUXT_MODE === 'spa') {
      contents += `/* /index.html 200\n`
    }

    if (contents !== '') {
      console.log(contents)
    }

    console.log('=======END OF REDIRECTS========')

    fs.writeFileSync(path, contents)
  }
}
