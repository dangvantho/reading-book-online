const express= require('express')
const route= express.Router()
const bookController= require('../controllers/book.controller')

route.get('/list-chapter/:link', bookController.getPageChapter)
route.get('/content-chapter/:link/:chapter', bookController.contentChapter)
route.get('/:link', bookController.index)

module.exports= route