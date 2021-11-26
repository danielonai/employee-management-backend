const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getByPhone,
    update,
    add
}

async function query() {
    try {
        const collection = await dbService.getCollection('user')
        var users = await collection.find().toArray()
        users = users.map(user => {
            delete user.password
            return user
        })
        return users
    } catch (err) {
        throw err
    }
}


async function getByPhone(phoneNumber) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ phoneNumber })
        return user
    } catch (err) {
        throw err
    }
}

async function update(user) {
    try {
        const userToSave = {
            _id: ObjectId(user._id), 
            phoneNumber: user.phoneNumber,
            isWorking: user.isWorking,
            sessions: user.sessions
        }
        const collection = await dbService.getCollection('user')
        await collection.updateOne({ _id: userToSave._id }, { $set: userToSave })
        return userToSave;
    } catch (err) {
        throw err
    }
}

async function add(user) {
    try {
        const userToAdd = {
            isEmployer: false,
            phoneNumber: user.phoneNumber,
            password: user.password,
            fullName: user.fullName,
            isWorking: false,
           sessions: []
        }
        const collection = await dbService.getCollection('user')
        await collection.insertOne(userToAdd)
        return userToAdd
    } catch (err) {
        throw err
    }
}




