// const mongoose=require("mongoose");
// const httpError=require("http-e")
const Person = require('./models/personModel.js')
function getPeople() {
    return Person.find().then((people) => {
        return people
    })
}

function getPerson(id) {
    return Person.findById(id).then((person) => person)
}

function addPerson(personToAdd) {
    let person = new Person(personToAdd)
    return person
        .save()
        .then((returnedPerson) => {
            // console.log(returnedPerson)
            return returnedPerson
        })
        // .catch((e) => {
        //     console.log('meow', e.message)
        //     throw e
        // })
}

function updatePerson(id, details) {
    return Person.findOneAndUpdate(
        { _id: id },
        { number: details.number },
        { new: true, runValidators: true }
    ).then((data) => {
        return data
    })
}
function deletePerson(id) {
    return Person.findOneAndDelete({ _id: id }).then((deletedPerson) => {
        return deletedPerson
    })
}

function personExists(name) {
    return Person.find({ name: name }).then((data) => {
        return data
    })
}

function countOfAllPersons() {
    return Person.countDocuments({}).then((count) => count)
}
module.exports = {
    getPeople,
    addPerson,
    personExists,
    deletePerson,
    getPerson,
    updatePerson,
    countOfAllPersons,
}
