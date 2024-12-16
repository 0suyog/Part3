const express = require('express')
const cors = require('cors')
const logger = require('./utils/logger.js')
const config = require('./utils/config.js')
const mongoose = require('mongoose')
const middleWare = require('./utils/middleware.js')
const phoneRouter = require('./controllers/phoneBook.js')

const url = config.MONGO_URI
mongoose.set('strictQuery', false)
mongoose.connect(url).then(() => {
    logger.info('database Connected')
})

const app = express()
app.use(express.json())
app.use(express.static('./dist'))
app.use(cors())
app.use(middleWare.requestLogger)
app.use('/api/persons', phoneRouter)
app.use(middleWare.unKnownEndPoint)
app.use(middleWare.errorHandler)

module.exports = app
