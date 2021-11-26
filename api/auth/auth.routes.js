const express = require('express')
const {login, signUp, logout} = require('./auth.controller')

const router = express.Router()

router.post('/login', login)
router.post('/signup', signUp)
router.post('/logout', logout)

module.exports = router