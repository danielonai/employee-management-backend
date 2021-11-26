const bcrypt = require('bcrypt')
const userService = require('../user/user.service')


async function login(phoneNumber, password) {

    const user = await userService.getByPhone(phoneNumber)
    if (!user || user.password !== password) return Promise.reject('Invalid username or password')
    // TODO: un-comment for real login
    // const match = await bcrypt.compare(password, user.password)
    // if (!match) return Promise.reject('Invalid username or password')

    delete user.password
    user._id = user._id.toString()
    return user
}

async function signup(phoneNumber, password, fullName) {
    const saltRounds = 10

    if (!phoneNumber || !password || !fullName) return Promise.reject('fullname, phoneNumber and password are required!')

    const hash = await bcrypt.hash(password, saltRounds)
    return userService.add({ phoneNumber, password: hash, fullName })
}

module.exports = {
    signup,
    login,
}