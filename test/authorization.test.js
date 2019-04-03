var assert = require('assert').strict
var auth = require('../src/authorization')
var user = {name: 'test', pass: 'test'}
var res = {
    setHeader: function(name, value) {
        this[name] = value
    },
    end: function(data) { 
        try {
            this.data = JSON.parse(data)
        } catch(e) {
            //handle case where data is a string, as opposted to stringified object, such as "Logged out"
            this.data = data
        }
    }   
}
var req = {
    on: function(name, callback) {
        if (name === 'data') {
            callback(JSON.stringify(user))
        }
        if (name === 'end') {
            callback()
        }
    }
}
module.exports = {
    run: function() {
        console.log('Running test suite for src/authorization.js')
        
        console.log('authorization#logout is a function')
        assert.equal(typeof auth.logout, 'function', 'expected logout to be a function')
    
        console.log('authorization#logout takes a req and res, sets res.statusCode to 200, expires a cookie named jwt, and calls res.end with Logged out')
        auth.logout(null, res)
        assert.equal(res.statusCode, 200, 'expected res.statusCode to be 200')
        assert.equal(res['Set-Cookie'], `jwt=''; Expires=${new Date('January 1 1990')}`)
        assert.equal(res.data, 'Logged out')

        console.log('authorization#login is a function')
        assert.equal(typeof auth.login, 'function', 'expected login to be a function')
        
        console.log('authorization#login takes a req and res, sets res.statusCode to 201, sets res.Set-Cookie to jwt=jwt; HttpOnly and calls res.end with a JSON string containing the message Logged in and a data object with a jwt key matching the jwt cookie')
        auth.login(req, res)
        assert.equal(res.statusCode, 201, 'expected res.statusCode to be 201')
        //TODO: break into two assertions as opposed to one for both the cookie and the data.jwt value
        assert.equal(res['Set-Cookie'], `jwt=${res.data.data.jwt}; HttpOnly`) 
        assert.equal(res.data.message, 'Logged in')

        console.log('authorization#login sets a res.statusCode of 422 if user object is missing name or pass, or is not JSON parse-able, and calls res.end with the string `Expected object like {"name": "name", "pass": "pass"}, received ${user}`')
        delete user.name 
        auth.login(req, res)
        assert.equal(res.statusCode, 422, 'expected res.statusCode to be 422')
        assert.equal(res.data, `Expected object like {"name": "name", "pass": "pass"}, received ${JSON.stringify(user)}`)
    }
}