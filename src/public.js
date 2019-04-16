var fs = require('fs')
var path = require('path')

module.exports = {
  html: function (_, res) {
    var html = fs.readFileSync(path.join(__dirname, '../public/index.html'))
    res.writeHead(200, { 'Content-Type': 'text/html' })

    res.end(html)
  },
  js: function js(_, res) {
    var js = fs.readFileSync(path.join(__dirname, '../public/index.js'))
    res.writeHead(200, {
      'Content-Type': 'text/javascript',
      'X-Content-Type-Options': 'nosniff'
    })

    res.end(js)
  },
  css: function (_, res) {
    var css = fs.readFileSync(path.join(__dirname, '../public/index.css'))
    res.writeHead(200, {
      'Content-Type': 'text/css',
      'X-Content-Type-Options': 'nosniff'
    })

    res.end(css)
  }
}