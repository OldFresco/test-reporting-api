module.exports = function() {
    switch (process.env.NODE_ENV) {
        case 'development':
            return { MONGO_URI: 'mongodb://localhost/testing' }

        case 'test':
            return { MONGO_URI: 'mongodb://localhost/testing' }

        case 'production':
            return { MONGO_URI: 'mongodb://localhost/testing' }

        default:
            return { MONGO_URI: 'mongodb://localhost/testing' }
    }
}