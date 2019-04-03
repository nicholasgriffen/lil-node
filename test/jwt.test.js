var jwt = require('../src/jwt')
var param = 'test'
var expectedKeys = ["header", "payload", "signature", "valid"]

module.exports = {
    run: function(assert) {
        console.log('Running test suite for src/jwt.js')

        console.log('jwt#encode is a function')
        assert.equal(typeof jwt.encode, 'function', 'expected encode to be a function')
        
        console.log('jwt#decode is a function')
        assert.equal(typeof jwt.decode, 'function', 'expected decode to be a function')

        console.log('jwt#encode takes one parameter and returns a string')
        var actual = jwt.encode(param)
        assert.equal(typeof actual, 'string', 'expected encode to return a string')

        console.log('jwt#encode returns a string with three base64 encoded strings separated by a .')
        actual.split('.').forEach(function(part) {
            assert.ok(Buffer.from(part, "base64").toString())
        })

        console.log('jwt#encode returns a string that can be run through jwt#decode to return an object with header, payload, signature, and valid keys, where valid will be true')
        var decoded = jwt.decode(actual) 
        assert.deepEqual(Object.keys(decoded), expectedKeys)
        assert.ok(decoded.valid)
    }
}