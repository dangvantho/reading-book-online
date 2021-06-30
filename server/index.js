const express= require('express')
const cors= require('cors')
const app= express()

const homeRoute= require('./routes/home.route')
const bookRoute= require('./routes/book.route')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use('/api/home', homeRoute)
app.use('/api/book', bookRoute)

app.listen(3001, ()=>console.log('App is running on port 3001'))
