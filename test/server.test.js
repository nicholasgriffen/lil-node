var http = require('http')
var server = require('../src/server')

var PORT = process.env.PORT || 3030

module.exports = {
    run: function(assert) {
        console.log('Running test suite for src/server.js')
        
        console.log('server#start is a function')
        assert.equal(typeof server.start, 'function', 'expected start to be a function')
    
        console.log('server#start starts an http server at process.env.PORT or a default 3030')
        server.start()
        
        http.get(`http://localhost:${PORT}`, function(res) {
            assert.ok(res)
            //wait for successful start test before stopping server
            console.log('server#stop is a function')    
            assert.equal(typeof server.stop, 'function', 'expected stop to be a function')
    
            console.log('server#stop stops the server')
            server.stop()
            
            //make a request and expect it to error 
            http.get(`http://localhost:${PORT}`, function(res) {
                //server is still running, stop did not work
                console.error('Expected server to stop')
            }).on('error', function(e) {
                //success, error should be ECONNREFUSED
                assert.equal(e.code, 'ECONNREFUSED', 'Expected connection to be refused')
            })    
        }).on('error', function(e) {
            console.error('caught', e)
        })    
    }
}