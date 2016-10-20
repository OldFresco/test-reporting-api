var express = require('express'),
    router = express.Router()

var TestResult = require('../app/models/result')

router.route('/results')

.post(function (req, res) {
    var result = new TestResult()

    result.name = req.body.name;
    result.version = req.body.version
    result.environment = req.body.environment
    result.testRunStartedAtTime = req.body.testRunStartedAtTime
    result.testRunCompletedAtTime = req.body.testRunCompletedAtTime
    result.overallResult = req.body.overallResult
    result.triggeredBy = req.body.triggeredBy
    result.triggeredFrom = req.body.triggeredFrom
    result.xmlResults = req.body.xmlResults
    result.htmlReport = req.body.htmlReport

    result.save(function (err) {
        if (err)
            res.send(err)

        res.json({
            'createdAt': Date.now(),
            'state': 'created',
            'content': result,
            'links': [{
                'href': req.protocol + req.hostname + req.originalUrl,
                'ref': 'self',
                'method': 'POST'
            }]
        })
    })
})

module.exports = router