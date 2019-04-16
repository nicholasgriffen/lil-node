var url = require('url')
var routes = {
  public:
    require('./public')
}

function handleRoot(req, res) {
  switch (req.method) {
    case ('GET'):
      routes.public.html(req, res)
      break
    default:
      _404(req, res)
  }
}

function handleJs(req, res) {
  switch (req.method) {
    case ('GET'):
      routes.public.js(req, res)
      break
    default:
      _404(req, res)
  }
}

function handleCss(req, res) {
  switch (req.method) {
    case ('GET'):
      routes.public.css(req, res)
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
      case ('/index.js'):
        handleJs(req, res)
        break
      case ('index.css'):
        handleCss(req, res)
        break
      default:
        _404(req, res)
    }
  }
}