const express= require('express')
const cors= require('cors')
const app= express()
const port = process.env.PORT || 3001

const homeRoute= require('./routes/home.route')
const bookRoute= require('./routes/book.route')
const topRoute= require('./routes/top.route')
const genreRoute= require('./routes/genre.route')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use('/api/home', homeRoute)
app.use('/api/book', bookRoute)
app.use('/api/top-story', topRoute)
app.use('/api/genre', genreRoute)

app.listen(port, ()=>console.log(`App is running on port ${port}`))
