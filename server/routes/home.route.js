const express= require('express')
const route= express.Router()
const homeController= require('../controllers/home.controller')

route.get('/category', homeController.category)
route.get('/hot-book', homeController.hotBook)
route.get('/new-book', homeController.newBook)
route.get('/', homeController.home)
module.exports= route