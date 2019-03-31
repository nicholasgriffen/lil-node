var url = require('url')
var { set, expire } = require('./cookie')
var { encode, decode } = require('./jwt')

var cookieName = 'jwt'

function validUser(name, pass) {
    return (name === "name" && pass === "pass")
}

module.exports = {
    logout: function(req, res) {
        expire(res, cookieName)
        res.statusCode = 200 
        res.end('Logged out')
    }, 
    
    login: function(req, res) {
        var user = ''

        req.on('data', function(chunk) {
            user += chunk
        })
        
        req.on('end', function() {
            var name = JSON.parse(user)["name"]
            var pass = JSON.parse(user)["pass"]
            
            if (!validUser(name, pass)) {
                res.statusCode = 422 
                res.end(`Expected object like {"name": "name", "pass": "pass"}, received ${user}`)
                return 
            }
            //set cookie
            set(res, cookieName, encode(name))
            
            res.statusCode = 201
            res.end(JSON.stringify({
                message: "Logged in",
                data: { jwt: encode(name) } //encode jwt 
            }))
        })
    }, 
    
    validate: function(req, res) {
        var params = url.parse(req.url, true).query
        var encoded = params.jwt

        try {
            var decoded = decode(encoded)
            var message;
            
            if (decoded.valid) {
                message = "VALID JWT"
            } else {
                message = "INVALID JWT - signature does not match"
            }

            res.statusCode = 200 

            res.end(JSON.stringify({
                message: message, 
                data: decoded
            }))

        } catch(e) {
            console.error(`Error decoding JWT: ${e}`)
            res.statusCode = 422
            res.end(`Expected query param jwt with value like [base64String].[base64String].[base64String], received ${encoded}`)
        }
    }
}