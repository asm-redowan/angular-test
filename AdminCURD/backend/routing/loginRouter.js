const express = require('express')
const controller = require('../controller/loginController')
const {decodeData} = require('../middleware/decoding')

// const {addUserValidator} = require('../middleware/typeValidator')

const loginroute = express.Router()

loginroute.post('/login',decodeData,controller.login)


module.exports = loginroute