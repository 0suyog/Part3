const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
require('./dbConfig.js')
const {
    addPerson,
    getPeople,
    personExists,
    deletePerson,
    getPerson,
    updatePerson,
    countOfAllPersons,
} = require('./dbHandler.js')

const app = express()
app.use(cors())
morgan.token('body', function (req) {
    return JSON.stringify(req.body)
})
// app.use(morgan(":method :url :status :response-time ms :body "));

app.use(express.json())
app.use(express.static('./dist'))
app.get('/api/persons', (req, res, next) => {
    if (req.query.name) {
        personExists(req.query.name).then((data) => {
            res.json(data)
            return
        })
    } else {
        getPeople()
            .then((data) => {
                console.log(data)
                res.json(data)
                return
            })
            .catch((e) => {
                next(e)
            })
    }
})

app.get('/info', (req, res, next) => {
    countOfAllPersons()
        .then((count) => {
            res.send(`<p>PhoneBook has ${count}</p><p>${Date()}</p>`)
        })
        .catch((e) => next(e))
})

app.get('/api/persons/:id', (req, res, next) => {
    let id = req.params.id
    getPerson(id)
        .then((person) => {
            res.json(person)
            return
        })
        .catch((e) => next(e))
})
app.delete('/api/persons/:id', (req, res, next) => {
    let id = req.params.id
    deletePerson(id)
        .then((deletedPerson) => {
            res.json(deletedPerson)
        })
        .catch((e) => next(e))
})

app.put('/api/persons/:id', (req, res, next) => {
    let id = req.params.id
    updatePerson(id, req.body)
        .then((data) => {
            res.json(data)
        })
        .catch((e) => {
            next(e)
        })
})

app.post('/api/persons/', async (req, res, next) => {
    let person = req.body

    addPerson(person)
        .then((returnedPerson) => {
            res.json(returnedPerson)
        })
        .catch((e) => {
            console.log('meow', e.message)
            next(e)
        })
})

app.use((err, req, res, next) => {
    // console.log('meow', err.message)
    if (err.name === 'ValidationError') {
        res.status(400).send({ error: err.message })
        return
    }
    res.status(500).send({ error: err.name })
    next()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log('Server is running in ', PORT)
})
