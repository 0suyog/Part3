const logger = require('./utils/logger.js')
const config = require('./utils/config.js')
const app = require('./app.js')
const PORT = config.PORT

app.listen(PORT || 3000, () => {
    logger.info('Server running in port ', PORT || 3000)
})
