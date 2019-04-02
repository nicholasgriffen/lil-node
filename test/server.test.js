var assert = require('assert').strict
var server = require('../src/server')
var http = require('http')
var PORT = process.env.PORT || 3030

;(function() {
    console.log('Running test suite for src/server.js')
    
    console.log('server#start is a function')
    assert.equal(typeof server.start, 'function', 'expected start to be a function')

    console.log('server#start starts an http server at process.env.PORT or a default 3030')
    
    server.start()
    
    http.get(`http://localhost:${PORT}`, function(res) {
        //wait for successful start test before stopping server
        console.log('server#stop is a function')    
        assert.equal(typeof server.stop, 'function', 'expected start to be a function')
        console.log('server#stop stops the server')
        server.stop()
        http.get(`http://localhost:${PORT}`, function(res) {
            console.error('Expected server to stop')
        }).on('error', function(e) {
            //success, error should be ECONNREFUSED
            assert.equal(e.code, 'ECONNREFUSED', 'Expected connection to be refused')
        })    
    }).on('error', function(e) {
        console.error('caught', e)
    })    
})()
