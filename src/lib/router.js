var { login } = require('./authorization')

function handleRoot(req, res) {
  switch (req.method) {
    case ('POST'):
      login(req, res)
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
    switch (req.url) {
      case ('/'):
        handleRoot(req, res)
        break
      default:
        handleUnknown(req, res)
    }
  }
}