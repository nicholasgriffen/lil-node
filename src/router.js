var url = require('url')
var fs = require('fs')
var path = require('path')
var { login, logout, validate } = require('./authorization')

function handleRoot(req, res) {
  switch (req.method) {
    case ('GET'):
      index(req, res)
      break
    case ('POST'):
      login(req, res)
      break 
    default: 
      _404(req, res)
  }
}

function handleJs(req, res) {
  switch (req.method) {
    case ('GET'):
      js(req, res)
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

function index(req, res) {
  var index = fs.readFileSync(path.join(__dirname, '../public/index.html'))
  res.writeHead(200, 'Content-Type: text/html')
  res.end(index)
}

function js(req, res) {
  var js = fs.readFileSync(path.join(__dirname, '../public/index.js'))
  res.writeHead(200, 'Content-Type: text/javascript')
  res.end(js)
}


module.exports = {
  handlers: function (req, res) {
    var path = url.parse(req.url).pathname
    switch (path) {
      case('/'):
        handleRoot(req, res)
        break
      case('/index.js'):
        handleJs(req, res)
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