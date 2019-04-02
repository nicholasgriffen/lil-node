var assert = require('assert').strict
var router = require('../src/lib/router')

module.exports = {
    run: function() {
        console.log('Running test suite for src/lib/router.js')
    
        console.log('router#handlers is a function')
        assert.equal(typeof router.handlers, 'function', 'expected handlers to be a function')
       
    }
}