var testSuites = [ require('./authorization.test'), require('./cookie.test'), require('./jwt.test'), require('./router.test'), require('./server.test') ]

testSuites.forEach(function(suite) {
    suite.run()
})