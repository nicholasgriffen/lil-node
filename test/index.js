var testSuites = [ require('./jwt.test'), require('./router.test'), require('./server.test') ]

testSuites.forEach(function(suite) {
    suite.run()
})