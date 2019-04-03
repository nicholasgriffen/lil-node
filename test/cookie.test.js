var assert = require('assert').strict 
var cookie = require('../src/cookie')
var res = {
    setHeader: function(name, value) {
        this[name] = value
    }
}
var name = 'test'
var value = 'success'
var setExpected =  `${name}=${value}; HttpOnly`
var expireExpected =  `${name}=''; Expires=${new Date('January 1 1990')}`

module.exports = {
    run: function() {
        console.log('Running test suite for src/cookie.js')

        console.log('cookie#set is a function')
        assert.equal(typeof cookie.set, 'function', 'expected encode to be a function')
        
        console.log('cookie#set takes a res, name, and value, and sets res.Set-Cookie to name=value; HttpOnly')
        cookie.set(res, name, value)
        assert.equal(res['Set-Cookie'], setExpected, `expected res.Set-Cookie to be ${setExpected}`)
        
        console.log('cookie#expire is a function')
        assert.equal(typeof cookie.expire, 'function', 'expected encode to be a function')
        
        console.log('cookie#expire takes a res, and name and sets res.Set-Cookie to name=\'\'; Expires=Mon Jan 01 1990 00:00:00 GMT-0700 (GMT-07:00)')
        cookie.expire(res, name)
        assert.equal(res['Set-Cookie'], expireExpected, `expected res.Set-Cookie to be ${expireExpected}`)
    
    }
}