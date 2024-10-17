const express = require('express')
const controller = require('../controller/companyController')
const {addCompanyValidator} = require('../middleware/typeValidator')
const { checkAuth } = require('../middleware/auth')
const {decodeData} = require('../middleware/decoding')

const companyroute = express.Router()

companyroute.post('/create',checkAuth,decodeData,addCompanyValidator,controller.addCompany)
companyroute.get('/getall',checkAuth,controller.getAll)
companyroute.delete('/delete',checkAuth,decodeData,controller.deleteCompany)

module.exports = companyroute
