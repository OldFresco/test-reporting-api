module.exports = function() {
    switch (process.env.NODE_ENV) {
        case 'development':
            return { MONGO_URI: 'mongodb://localhost' }

        case 'production':
            return { MONGO_URI: 'mongodb://localhost' }

        default:
            return { MONGO_URI: 'mongodb://localhost' }
    }
}