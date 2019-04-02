var http = require('http')
var router = require('./router')

var PORT = process.env.PORT || 3030
var server = http.createServer(router.handlers)

module.exports = {
  start: function () {
    console.log(`Server listening on ${PORT}`)
    server.listen(PORT)
  },

  stop: function() {
    server.close()
    console.log(`Server stopped`)
  }
}