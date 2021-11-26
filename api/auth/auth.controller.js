const authService = require('./auth.service')

async function login(req, res) {
    const { phoneNumber, password } = req.body
    try {
        const user = await authService.login(phoneNumber, password)
        req.session.user = user
        res.json(user)
    } catch (err) {
        res.status(401).send({ err: 'Failed to Login' })
    }
}
async function signUp(req, res) {
    try {
        const { phoneNumber, password, fullName } = req.body
        // Never log passwords
        const user = await authService.signup(phoneNumber, password, fullName)
        res.json(user)
    } catch (err) {
        console.log(`err`, err)
        res.status(500).send({ err: 'Failed to signup' })
    }
}

async function logout(req, res) {
    try {
        // req.session.destroy()
        req.session.user = null;
        res.send({ msg: 'Logged out successfully' })
    } catch (err) {
        res.status(500).send({ err: 'Failed to logout' })
    }
}

module.exports = {
    login,
    signUp,
    logout
}