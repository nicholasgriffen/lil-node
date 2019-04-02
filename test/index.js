var testSuites = [ require('./server.test'), require('./router.test') ]

testSuites.forEach(function(suite) {
    suite.run()
})