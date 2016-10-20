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

// set our port
var port = process.env.PORT || 8080 

// configure app
app.use(morgan('dev')) // log requests to the console

// configure body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// Register routes
app.use(require('./controllers'))

// connect to our database
mongoose.connect(config().MONGO_URI)

// START THE SERVER
// =============================================================================
app.listen(port)
console.log('Server listening on port: ' + port)