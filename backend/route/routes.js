const express = require('express')
const route = express.Router()

const { register, login, getUser } = require('../controller/userController')

route.post('/register', register)

route.post('/login', login)

route.get('/getUser', getUser)

module.exports = route;