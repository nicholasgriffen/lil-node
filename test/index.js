var assert = require('assert').strict

var testSuites = [
    require('./router.test'),
    require('./server.test')
]

testSuites.forEach(function (suite) {
    suite.run(assert)
})