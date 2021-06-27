const express= require('express')
const cors= require('cors')
const app= express()

const testRoute= require('./routes/test.route')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cors())

app.use('/test', testRoute)

app.listen(3001, ()=>console.log('App is running on port 3001'))
