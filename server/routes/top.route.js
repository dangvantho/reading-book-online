const express= require('express')
const route= express.Router()
const topController= require('../controllers/top.controller')

route.get('/', topController.index)

module.exports= route