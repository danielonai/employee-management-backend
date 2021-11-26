const userService = require('./user.service')


async function getUsers(req, res) {
    try {
        const users = await userService.query()
        res.send(users)
    } catch (err) {
        res.status(500).send({ err: 'Failed to get users' })
    }
}

async function updateUser(req, res) {
    try {
        const user = req.body
        const savedUser = await userService.update(user)
        res.send(savedUser)
    } catch (err) {
        res.status(500).send({ err: 'Failed to update user' })
    }
}

module.exports = {
    getUsers,
    updateUser
}