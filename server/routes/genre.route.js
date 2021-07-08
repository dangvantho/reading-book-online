const express= require('express')
const route= express.Router()
const genreController= require('../controllers/genre.controller')

route.get('/', genreController.index)
route.get('/hot-trend', genreController.hotCategory)

module.exports= route