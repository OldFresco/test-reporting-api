var express = require('express'),
    router = express.Router()

var validate = require('express-jsonschema').validate
var resultFormatSpecification = require('../../services/schema-validation')
var TestResult = require('../../models/result')

// Register middleware
router.use(validate({ body: resultFormatSpecification }))
router.use(function(err, req, res, next) {
    var responseData;

    if (err.name === 'JsonSchemaValidation') {
        res.status(400)
        responseData = {
            status: 'Bad Request',
            jsonSchemaValidation: true,
            validations: err.validations
        }

        res.json(responseData);
    } else {
        next(err);
    }
})

router.route('/results').post(function(req, res) {
    var results = [];
    for (var i = 0; i < req.body.length; i++) {
        var result = new TestResult()

        result.name = req.body[i].name
        result.version = req.body[i].version
        result.environment = req.body[i].environment
        result.testRunStartedAtTime = req.body[i].testRunStartedAtTime
        result.testRunCompletedAtTime = req.body[i].testRunCompletedAtTime
        result.overallResult = req.body[i].overallResult
        result.triggeredBy = req.body[i].triggeredBy
        result.triggeredFrom = req.body[i].triggeredFrom
        result.xmlResults = req.body[i].xmlResults
        result.htmlReport = req.body[i].htmlReport

        results[i] = result

        result.save(function(err) {
            if (err) {
                res.status(400)
                res.json({ error: err })
            }
        })
    }

    res.json({
        'createdAt': new Date(),
        'state': 'created',
        'content': results,
        'links': [{
            'href': req.protocol + '://' + req.hostname + req.originalUrl,
            'ref': 'self',
            'method': 'POST'
        }]
    })
})

module.exports = router