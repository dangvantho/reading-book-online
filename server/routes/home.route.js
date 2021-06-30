const express= require('express')
const route= express.Router()
const homeController= require('../controllers/home.controller')

route.get('/', homeController.home)
route.get('/category', homeController.category)
route.get('/hot-book', homeController.hotBook)
route.get('/new-book', homeController.newBook)
module.exports= route