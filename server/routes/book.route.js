const express= require('express')
const route= express.Router()
const bookController= require('../controllers/book.controller')

route.get('/:link', bookController.index)
route.get('/list-chapter/:link', bookController.getPageChapter)
route.get('/content-chapter/:link/:chapter', bookController.contentChapter)

module.exports= route