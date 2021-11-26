
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    getByPhone,
    remove,
    update,
    add
}

async function query() {
    try {
        const collection = await dbService.getCollection('user')
        var users = await collection.find().toArray()
        users = users.map(user => {
            delete user.password
            user.createdAt = ObjectId(user._id).getTimestamp()
            // Returning fake fresh data
            // user.createdAt = Date.now() - (1000 * 60 * 60 * 24 * 3) // 3 days ago
            return user
        })
        return users
    } catch (err) {
        throw err
    }
}

async function getById(userId) {
    try {
        const collection = await dbService.getCollection('user')
        const user = await collection.findOne({ '_id': ObjectId(userId) })
        delete user.password

        return user
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

async function remove(userId) {
    try {
        const collection = await dbService.getCollection('user')
        await collection.deleteOne({ '_id': ObjectId(userId) })
    } catch (err) {
        throw err
    }
}

async function update(user) {
    try {
        const userToSave = {
            _id: ObjectId(user._id), // needed for the returnd obj
            phoneNumber: user.phoneNumber,
            isWorking: user.isWorking,
            totalSessions: user.totalSessions,
            monthlyHours: user.monthlyHours
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
        // peek only updatable fields!
        // console.log('user from user service', user);
        const userToAdd = {
            isEmployer: false,
            phoneNumber: user.phoneNumber,
            password: user.password,
            fullName: user.fullName,
            isWorking: false,
            totalSessions: 0,
            monthlyHours: 0
        }
        console.log(`userToAdd:`, userToAdd)
        const collection = await dbService.getCollection('user')
        await collection.insertOne(userToAdd)
        return userToAdd
    } catch (err) {
        throw err
    }
}

// function _buildCriteria(filterBy) {
//     const criteria = {}
//     if (filterBy.txt) {
//         const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
//         criteria.$or = [
//             {
//                 username: txtCriteria
//             },
//             {
//                 fullname: txtCriteria
//             }
//         ]
//     }
//     if (filterBy.minBalance) {
//         criteria.balance = { $gte: filterBy.minBalance }
//     }
//     return criteria
// }




