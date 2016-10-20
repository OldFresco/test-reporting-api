var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TestResultSchema = new Schema({
    name: String,
    version: String,
    environment: String,
    testRunStartedAtTime: Date,
    testRunCompletedAtTime: Date,
    overallResult: String,
    triggeredBy: String,
    triggeredFrom: String,
    xmlResults: String,
    htmlReport: String
});

module.exports = mongoose.model('TestResult', TestResultSchema);