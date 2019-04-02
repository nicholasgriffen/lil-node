var assert = require('assert').strict
var router = require('../src/router')
var res = {
    statusCode: 0,
    end: function(data) {
        return data 
    }, 
    setHeader: function(header) {
        return header
    }
}

function mockReq(url, method) {
    return {
        url: url, 
        method: method, 
        on: function() {}
    }
}
module.exports = {
    run: function() {
        console.log('Running test suite for src/lib/routecr.js')
    
        console.log('router#handlers is a function')
        assert.equal(typeof router.handlers, 'function', 'expected handlers to be a function')
        
        console.log('router#handlers accepts a POST to /')
        assert.doesNotThrow(function() { router.handlers(mockReq('/', 'POST'), res) })
        assert.notEqual(res.statusCode, 404, 'route should not 404')

        console.log('router#handlers accepts a GET to /validate')
        assert.doesNotThrow(function() { router.handlers(mockReq('/validate', 'GET'), res) })
        assert.notEqual(res.statusCode, 404, 'route should not 404')

        
        console.log('router#handlers accepts a GET to /logout')
        assert.doesNotThrow(function() { router.handlers(mockReq('/logout', 'GET'), res) })
        assert.notEqual(res.statusCode, 404, 'route should not 404')

        console.log('router#handlers sets a status code of 404 on unrecognized routes or methods')
        assert.doesNotThrow(function() { router.handlers(mockReq('/', 'PUT'), res) })
        assert.equal(res.statusCode, 404, 'unknown route or route + method should 404')
    }
}