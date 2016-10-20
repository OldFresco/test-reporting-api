// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var morgan = require('morgan')
var mongoose = require('mongoose')
var config = require('./config/config')
var TestResult = require('./app/models/result')

// configure app
app.use(morgan('dev')) // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var port = process.env.PORT || 8080 // set our port
mongoose.connect(config().MONGO_URI) // connect to our database

// ROUTES FOR OUR API
// =============================================================================

// create our router
var router = express.Router()

// Health check
router.get('/health', function(req, res) {
    res.json({ message: 'Ok' })
})

// on routes that end in /test/results
// ----------------------------------------------------
router.route('/results')

// create a result resouce (accessed at POST http://localhost:8080/test/results)
.post(function(req, res) {
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

    result.save(function(err) {
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

// REGISTER OUR ROUTES -------------------------------
app.use('/test', router)

// START THE SERVER
// =============================================================================
app.listen(port)
console.log('Server listening on port: ' + port)