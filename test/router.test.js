var router = require('../src/router')
/*
    this suite is only concerned with the high level route handling 
    so properties of req and res, other than statusCode, are not checked
    res and req methods are not truly invoked, and event handler callbacks passed to req.on are not invoked
    lower level functionality is tested in other suites 
*/
var res = {
    end: function() {},
    setHeader: function() {}, 
    writeHead: function() {}
}

function mockReq(url, method) {
    return {
        url: url, 
        method: method, 
        on: function() {}
    }
}
module.exports = {
    run: function(assert) {
        console.log('Running test suite for src/lib/router.js')
    
        console.log('router#handlers is a function')
        assert.equal(typeof router.handlers, 'function', 'expected handlers to be a function')
        
        console.log('router#handlers accepts a GET to /')
        router.handlers(mockReq('/', 'GET'), res)
        assert.notEqual(res.statusCode, 404, 'route should not 404')

        console.log('router#handlers accepts a GET to /index.js')
        router.handlers(mockReq('/index.js', 'GET'), res)
        assert.notEqual(res.statusCode, 404, 'route should not 404')

        console.log('router#handlers accepts a POST to /')
        router.handlers(mockReq('/', 'POST'), res)
        assert.notEqual(res.statusCode, 404, 'route should not 404')

        console.log('router#handlers accepts a GET to /validate')
        router.handlers(mockReq('/validate', 'GET'), res)
        assert.notEqual(res.statusCode, 404, 'route should not 404')
        
        console.log('router#handlers accepts a GET to /logout')
        router.handlers(mockReq('/logout', 'GET'), res)
        assert.notEqual(res.statusCode, 404, 'route should not 404')

        console.log('router#handlers sets a status code of 404 on unrecognized routes or methods')
        router.handlers(mockReq('/', 'PUT'), res)
        assert.equal(res.statusCode, 404, 'unknown route or route + method should 404')
    }
}