var TestResultValidaitonSchema = {
    "type": "array",
    "minItems": 1,
    "items": [{
        "type": "object",
        required: true
    }]
}

module.exports = TestResultValidaitonSchema