// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var morgan = require('morgan')
var mongoose = require('mongoose')
var config = require('./app/config/config')
var TestResult = require('./app/models/result')

// set our port
var port = process.env.PORT || 8080

// configure app
app.use(morgan('dev')) // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Register middleware
app.use(function(err, req, res, next) {
    var responseData;

    if (err.name === 'JsonSchemaValidation') {
        //console.log(err.message);

        res.status(400)
        responseData = {
            status: 'Bad Request',
            jsonSchemaValidation: true,
            validations: err.validations
        };

        res.json(responseData);
    } else {
        next(err);
    }
});

// Register routes
app.use(require('./app/routes'))

// connect to our database
mongoose.connect(config().MONGO_URI)

// START THE SERVER
// =============================================================================
app.listen(port)
console.log('Server listening on port: ' + port)