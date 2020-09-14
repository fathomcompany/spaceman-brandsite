// Deps
const { getEntries, config } = require('bukwild-contentful-utils')
const isString = require('lodash.isstring')

// Load environment config vars
if (require('fs').existsSync('.env')) require('dotenv').config()

module.exports = {}

// Configure the contentful utils, this runs before registration of module
config({
  space: process.env.CONTENTFUL_SPACE,
  access_token: process.env.CONTENTFUL_API,
  host: process.env.CONTENTFUL_HOST,
  timeout: 5 * 60 * 1000
}) // 5 mins

// Build the list of all routes for generating static files
module.exports.forGenerate = async function() {
  // Simple routes
  let routes = [
    '/' // Should generate using the main Home Page
  ]

  /**
   * PAGES
   */
  const { items: pages } = await getEntries('page', { include: 3 })
  routes = routes.concat(
    pages.map(function(entry) {
      if (['homepage'].includes(entry.slug)) {
        return
      } // Pages not to render
      return { route: `/${entry.slug}` }
    })
  )

  /**
   * PROJECTS
   */
  const { items: projects } = await getEntries('project', { include: 3 })
  routes = routes.concat(
    projects.map(function(entry) {
      return { route: `/project/${entry.slug}` }
    })
  )

  // Return non empty routes
  return routes.filter((route) => !!route)
}

// Flatten this object to an array of paths for use by the sitemap module
module.exports.forSitemap = async function() {
  const routes = await module.exports.forGenerate()
  return routes
    .map(function(route) {
      if (isString(route)) {
        return route
      } else {
        return route.route
      }
    })
    .filter((route) => !!route) // Clear empties
}
