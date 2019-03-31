var { login, validate } = require('./authorization')
var url = require('url')

function handleRoot(req, res) {
  switch (req.method) {
    case ('POST'):
      login(req, res)
      break 
    default: 
      handleUnknown(req, res)
  }
}

function handleValidate(req, res) {
  switch(req.method) {
    case ('GET'):
      validate(req, res)
      break 
    default: 
      handleUnknown(req, res)
  }
}

function handleUnknown(req, res) {
  console.log('404')
  res.statusCode = 404
  res.end('No routes found')
}

module.exports = {
  handlers: function (req, res) {
    switch (url.parse(req.url).pathname) {
      case ('/'):
        handleRoot(req, res)
        break
      case('/validate'):
        handleValidate(req, res)
        break
      default:
        handleUnknown(req, res)
    }
  }
}