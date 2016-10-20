var express = require('express'),
    router = express.Router()

router.use('/test', require('./test/results'))

router.get('/health', function(req, res) {
    res.json({ message: 'Ok' })
})

module.exports = router