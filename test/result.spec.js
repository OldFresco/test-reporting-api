process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Results = require('../app/models/result');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('RESULTS TESTS', () => {
    beforeEach((done) => {
        Results.remove({}, (err) => {
            done()
        })
    })

    describe('GIVEN a valid request to POST a correctly formatted test result', () => {
        let testResult = [{
            name: "LikelyLoans.UserJourneyTests",
            version: "1.7.0.114-TEC461",
            environment: "DEV",
            testRunStartedAtTime: "2016-10-18 13:19:05",
            testRunCompletedAtTime: "2016-10-18 13:24:05",
            overallResult: "Pass",
            triggeredBy: "Kojo",
            triggeredFrom: "Octopus - Argon.Host.Web 2.48.0-runTests",
            xmlResults: "<xml>Test Passed</xml>",
            htmlReport: "<html>Test Passed</html>"
        }]

        let links = [{
            "href": "http://undefined/test/results",
            "ref": "self",
            "method": "POST"
        }]

        it('THEN it should return an HTTP success code', (done) => {
            chai.request(server)
                .post('/test/results')
                .send(testResult)
                .end((err, res) => {
                    res.should.have.status(200)
                    done()
                })
        })

        it('THEN it should return an object with the expected properties', (done) => {
            chai.request(server)
                .post('/test/results')
                .send(testResult)
                .end((err, res) => {
                    res.body.should.be.a('object')
                    res.body.should.have.property('content')
                    res.body.should.have.property('state').eql('created')
                    res.body.should.have.property('links').eql(links)
                    done()
                })
        })

        it('THEN it should persist a test record containing the test result into the datastore', (done) => {
            chai.request(server)
                .post('/test/results')
                .send(testResult)
                .end((err, res) => {
                    Results.findOne({}, (err, results) => {
                        if (err) return
                        results.should.be.a('object')
                        results.count.should.be(1)
                        results.body.should.have.property('name').eql('LikelyLoans.UserJourneyTests')
                    })
                    done()
                })
        })
    })

    describe('GIVEN an invalid request to POST a badly formatted test result', () => {

        let invalidFormatTestResult = {
            name: "LikelyLoans.UserJourneyTests",
            version: "1.7.0.114-TEC461",
            environment: "DEV",
            testRunStartedAtTime: "2016-10-18 13:19:05",
            testRunCompletedAtTime: "2016-10-18 13:24:05",
            overallResult: "Pass",
            triggeredBy: "Kojo",
            triggeredFrom: "Octopus - Argon.Host.Web 2.48.0-runTests",
            xmlResults: "<xml>Test Passed</xml>",
            htmlReport: "<html>Test Passed</html>"
        }

        it('THEN it should return an HTTP bad request code', (done) => {
            chai.request(server)
                .post('/test/results')
                .send(invalidFormatTestResult)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                })
        })

        it('THEN it should return an object with the expected properties', (done) => {
            chai.request(server)
                .post('/test/results')
                .send(invalidFormatTestResult)
                .end((err, res) => {
                    res.body.should.be.a('object')
                    res.body.should.have.property('status').eql('Bad Request')
                    res.body.should.have.property('jsonSchemaValidation').eql(true)
                    res.body.should.have.property('validations')
                    done();
                })
        })
    })
})