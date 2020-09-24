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
  this.nuxt.hook('generate:before', generateRedirects)
}

/**
 * Pull redirect entries fron contentful to generate Netlify's
 * `_redirects` file in the static directory
 * See: https://docs.netlify.com/routing/redirects/
 */
function generateRedirects(builder) {
  // Only run if generating on netlify (which adds a DEPLOY_URL env)
  if (process.env.npm_lifecycle_event === 'generate') {
    console.log('=======BUILDING REDIRECTS FROM CONTENTFUL========')

    let contents = '\n\n# Dynamic redirects\n'

    // Set up a wildcard route so the staing SPA can find unpublished content pages
    if (process.env.NUXT_MODE === 'spa') {
      contents += `/* /index.html 200\n`
    }

    if (contents !== '') {
      console.log(contents)
    }

    console.log('=======END OF REDIRECTS========')

    fs.appendFileSync(path, contents)
  }
}
