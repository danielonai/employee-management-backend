const authService = require('./auth.service')

async function login(req, res) {
    const { phoneNumber, password } = req.body
    try {
        console.log('num', phoneNumber);
        const user = await authService.login(phoneNumber, password)
        req.session.user = user
        res.json(user)
    } catch (err) {
        res.status(401).send({ err: 'Failed to Login' })
    }
}
async function signup(req, res) {
    try {
        const { username, password, fullname } = req.body
        // Never log passwords
        const account = await authService.signup(username, password, fullname)
        const user = await authService.login(username, password)
        req.session.user = user
        console.log('session user:', req.session);
        res.json(user)
    } catch (err) {
        res.status(500).send({ err: 'Failed to signup' })
    }
}

async function logout(req, res){
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
    signup,
    logout
}