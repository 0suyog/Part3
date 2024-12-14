const mongoose = require('mongoose')

const url = process.env.MONGO_URI

mongoose.set('strictQuery', false)
mongoose.connect(url).then(() => {
    console.log('database Connected')
})
