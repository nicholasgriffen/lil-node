// per RFC 7519
// JWT MAY also be created without a signature or encryption.  An Unsecured
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
    }
}