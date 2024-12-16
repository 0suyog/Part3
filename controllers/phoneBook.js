const phoneRouter = require('express').Router()
const {
    addPerson,
    getPeople,
    personExists,
    // deletePerson,
    getPerson,
    updatePerson,
    // countOfAllPersons,
} = require('../dbHandler.js')
// const logger = require('../utils/logger.js')

phoneRouter.get('/:id', (req, res, next) => {
    let id = req.params.id
    getPerson(id)
        .then((person) => {
            res.json(person)
            return
        })
        .catch((e) => next(e))
})

phoneRouter.get('/', (req, res, next) => {
    if (req.query.name) {
        personExists(req.query.name).then((data) => {
            res.json(data)
            return
        })
    } else {
        getPeople()
            .then((data) => {
                res.json(data)
                return
            })
            .catch((e) => {
                next(e)
            })
    }
})

phoneRouter.put('/:id', (req, res, next) => {
    let id = req.params.id
    updatePerson(id, req.body)
        .then((data) => {
            res.json(data)
        })
        .catch((e) => {
            next(e)
        })
})

phoneRouter.post('/', (req, res, next) => {
    let person = req.body

    addPerson(person)
        .then((returnedPerson) => {
            res.json(returnedPerson)
        })
        .catch((e) => {
            next(e)
        })
})

module.exports = phoneRouter
