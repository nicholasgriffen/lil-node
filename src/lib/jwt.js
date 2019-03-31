// per RFC 7519 Section 6
// JWTs MAY also be created without a signature or encryption.  An Unsecured
// JWT is a JWS using the "alg" Header Parameter value "none" and with
// the empty string for its JWS Signature value
module.exports = {
    encode: function(name) {
        var header = Buffer.from(JSON.stringify({
            typ: "JWT", 
            alg: "none"
        })).toString("base64")

        var claimsSet = Buffer.from(JSON.stringify({
            iss: "Auth-Server by Nicholas Griffen",
            iat: Date.now(), 
            userName: name
        })).toString("base64")

        var signature = ''
        
        return `${header}.${claimsSet}.${signature}`
    }, 
    decode: function(jwt) {
        var split = jwt.split('.')
        var header = JSON.parse(Buffer.from(split[0], "base64").toString("utf8"))
        var payload = JSON.parse(Buffer.from(split[1], "base64").toString("utf8"))

        return {
            header: header, 
            payload: payload, 
            signature: ''
        }
    }
}