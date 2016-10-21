module.exports = function() {
    switch (process.env.NODE_ENV) {
        case 'dev':
            return { MONGO_URI: 'mongodb://localhost/testing' }

        case 'test':
            return { MONGO_URI: 'mongodb://localhost/testing' }

        case 'prod':
            return { MONGO_URI: 'mongodb://localhost/testing' }

        default:
            return { MONGO_URI: 'mongodb://localhost/testing' }
    }
}