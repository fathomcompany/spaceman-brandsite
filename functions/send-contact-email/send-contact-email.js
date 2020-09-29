// with thanks to https://github.com/Urigo/graphql-modules/blob/8cb2fd7d9938a856f83e4eee2081384533771904/website/lambda/contact.js
const sgMail = require('@sendgrid/mail')
const { validateEmail, validateLength } = require('./validations')

const headers = {}

exports.handler = (event, context, callback) => {
  const body = JSON.parse(event.body)

  if (!process.env.SENDGRID_API_KEY) {
    return callback(null, {
      statusCode: 500,
      headers,
      body: 'process.env.SENDGRID_API_KEY must be defined'
    })
  }

  sgMail.setApiKey(process.env.SENDGRID_API_KEY)

  if (!process.env.CONTACT_EMAIL) {
    return callback(null, {
      statusCode: 500,
      headers,
      body: 'process.env.CONTACT_EMAIL must be defined'
    })
  }

  // const body = {
  //   name: 'Stan',
  //   email: 'stan@fathom.company',
  //   message: 'FOO BAR lorem ipsum dolor'
  // }

  // return callback(null, { statusCode: 200, headers, body: 'DEBUG' })

  try {
    validateLength('body.name', body.name, 3, 50)
  } catch (e) {
    return callback(null, {
      statusCode: 403,
      headers,
      body: e.message
    })
  }

  try {
    validateEmail('body.email', body.email)
  } catch (e) {
    return callback(null, {
      statusCode: 403,
      headers,
      body: e.message
    })
  }

  try {
    validateLength('body.message', body.message, 0, 2000)
  } catch (e) {
    return callback(null, {
      statusCode: 403,
      headers,
      body: e.message
    })
  }

  const emailBody = {
    // This email msut be a verified sender in SendGrid admin
    to: process.env.CONTACT_EMAIL,
    from: process.env.CONTACT_EMAIL,

    // So the reply button will be the source of the message
    reply_to: body.email,

    subject: 'SPACEMAN - Web Contact',
    text: `
Name:
${body.name}

Email:
${body.email}

Phone:
${body.phone || ''}

Message:
${body.message}`
  }

  // return callback(null, { statusCode: 200, headers, body: 'DEBUG' })

  sgMail
    .send(emailBody)
    .then(() => {
      console.log('SUCCESS')
      return callback(null, {
        statusCode: 200,
        headers,
        body: 'success'
      })
    })
    .catch((e) => {
      console.log('FAIL')
      return callback(null, {
        statusCode: e.code,
        headers,
        body: 'Server could not send message.' + e.message
      })
    })

  console.log('END')
}
