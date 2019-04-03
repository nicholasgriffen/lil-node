var url = require('url')
var { set, expire } = require('./cookie')
var { encode, decode } = require('./jwt')

var cookieName = 'jwt'

function validUser(name, pass) {
    return (name && pass)
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
            try {
                // gracefully handle JSON parsing errors
                var name = JSON.parse(user)["name"]
                var pass = JSON.parse(user)["pass"]
                
                if (!validUser(name, pass)) {
                    res.statusCode = 422 
                    res.end(`Expected object like {"name": "name", "pass": "pass"}, received ${user}`)
                    return 
                }
                var jwt = encode(name)
                set(res, cookieName, jwt)
                
                res.statusCode = 201
                res.end(JSON.stringify({
                    message: "Logged in",
                    data: { jwt:  jwt }  
                }))
            } catch (e) {
                res.statusCode = 422 
                res.end(`Expected object like {"name": "name", "pass": "pass"}, received ${user}`)
                return
            }
        
        })
    }, 
    
    validate: function(req, res) {
        var params = url.parse(req.url, true).query
        var encoded = params.jwt

        try {
            // gracefully handle JSON parsing errors in the decode method
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
            res.statusCode = 422
            res.end(`Expected query param jwt with value like [base64String].[base64String].[base64String], received ${encoded}`)
        }
    }
}