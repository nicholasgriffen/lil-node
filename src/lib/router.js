function handlePost(req, res) {

}

function handleUnknown(req, res) {
  console.log('404')
  res.statusCode = 404
  res.end('No routes found')
}

module.exports = {
  handlers: function (req /*http.IncomingMessage*/, res /*http.ServerResponse*/) {
    switch (req.method) {
      case ('POST'):
        handlePost(req, res)
        break
      default:
        handleUnknown(req, res)
    }
  }
}