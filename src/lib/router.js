var { login, logout, validate } = require('./authorization')
var url = require('url')

function handleRoot(req, res) {
  switch (req.method) {
    case ('POST'):
      login(req, res)
      break 
    default: 
      _404(req, res)
  }
}

function handleValidate(req, res) {
  switch(req.method) {
    case ('GET'):
      validate(req, res)
      break 
    default: 
      _404(req, res)
  }
}

function handleLogout(req, res) {
  switch(req.method) {
    case ('GET'):
      logout(req, res)
      break 
    default: 
      _404(req, res)
  }
}

function _404(req, res) {
  res.statusCode = 404
  res.end(`No routes matching ${req.method} to ${req.url}`)
}

module.exports = {
  handlers: function (req, res) {
    var path = url.parse(req.url).pathname
    switch (path) {
      case ('/'):
        handleRoot(req, res)
        break
      case('/validate'):
        handleValidate(req, res)
        break
      case('/logout'):
        handleLogout(req, res)
        break
      default:
        _404(req, res)
    }
  }
}