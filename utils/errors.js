/*
General errors helpers
*/

// Standard 404 object
export const notFound = {
  statusCode: 404,
  message: 'Page not found'
}

// When a settings files isn't present
export const settingsNotDefined = {
  message: 'No global `settings` object found in Contentful!'
}
