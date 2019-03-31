var { set } = require('./cookie')
var { encode } = require('./jwt')

function validUser(name, pass) {
    return (name === "name" && pass === "pass")
}

module.exports = {
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
                res.end(`expected object like {"name": "name", "pass": "pass"}, received ${user}`)
                return 
            }
            //set cookie
            set(res, 'user', name)
            
            res.statusCode = 201
            res.end(JSON.stringify({
                message: "Logged in",
                data: { jwt: encode(name) } //encode jwt 
            }))
        })
        // return jwt 
    }
}