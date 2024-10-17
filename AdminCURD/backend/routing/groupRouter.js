const express = require('express')
const controller = require('../controller/groupController')
const { checkAuth } = require('../middleware/auth')
const {decodeData} = require('../middleware/decoding')
const {addGroupValidator} = require('../middleware/typeValidator')

const grouproute = express.Router()

grouproute.post("/create",checkAuth,decodeData,addGroupValidator,controller.addGroup)
grouproute.get("/getall",checkAuth,controller.getAll)
grouproute.delete("/delete",checkAuth,decodeData,controller.deleteGroup)


module.exports = grouproute