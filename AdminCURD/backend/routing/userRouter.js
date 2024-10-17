const express = require('express')
const controller = require('../controller/userController')
const {addUserValidator, updateUserValidator} = require('../middleware/typeValidator')
const {decodeData} = require('../middleware/decoding')
const { checkAuth } = require('../middleware/auth')

const userroute = express.Router()

userroute.post('/create',checkAuth,decodeData,addUserValidator,controller.addUser)
userroute.get('/getall',checkAuth,controller.getAll)
userroute.put('/update',checkAuth,decodeData,updateUserValidator,controller.updateUser)
userroute.delete('/delete',checkAuth,decodeData,controller.deleteUser)
userroute.post('/isemail',checkAuth,controller.isEmail)


module.exports = userroute