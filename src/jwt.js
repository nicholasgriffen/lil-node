var crypto = require('crypto')
/* 
 Normally I would protect the secret through an environment variable, or a .gitignore'd local file.
 In this case for ease of use / project review I have hardcoded a secret
 Prior to the hardcode, I wrote the line this way:
 var secret =  || String(require('fs').readFileSync(require('path').join(__dirname, 'secret')))
 */
var secret = process.env.SECRET || 'THIS_IS_NOT_SECURE'

function digest(header, payload) {
    return crypto.createHmac("sha256", secret).update(`${header}.${payload}`).digest("base64")
}

module.exports = {
    encode: function(name) {
        var header = Buffer.from(JSON.stringify({
            typ: "JWT", 
            alg: "HS256"
        })).toString("base64")

        var claimsSet = Buffer.from(JSON.stringify({
            iss: "Auth-Server by Nicholas Griffen",
            iat: Date.now(), 
            userName: name
        })).toString("base64")

        var signature = digest(header, claimsSet)
        
        return `${header}.${claimsSet}.${signature}`
    }, 
    decode: function(jwt) {
        var split = jwt.split('.')
        var header = JSON.parse(Buffer.from(split[0], "base64").toString("utf8"))
        var payload = JSON.parse(Buffer.from(split[1], "base64").toString("utf8"))
        var valid = digest(split[0], split[1]) === split[2]

        return {
            header: header, 
            payload: payload, 
            signature: split[2],
            valid: valid
        }
    }
}