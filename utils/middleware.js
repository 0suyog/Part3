const logger = require('./logger.js')
const errorHandler = (err, req, res, next) => {
    if (err.name === 'ValidationError') {
        logger.error(err.message)
        res.status(400).send({ error: err.message })
        return
    }
    res.status(500).send({ error: err.name })
    next()
}

const requestLogger = (req, res, next) => {
    logger.info('Method: ', req.method)
    logger.info('Path: ', req.path)
    logger.info('Body: ', req.body)
    logger.info('*-------*')
    next()
}

const unKnownEndPoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

module.exports = { errorHandler, requestLogger, unKnownEndPoint }
