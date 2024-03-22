require('dotenv').config()
const PORT = process.env.PORT
const express = require('express')
const app = express()
const breadsController = require('./controllers/breads_controller.js')
const methodOverride = require('method-override')
const mongoose = require('mongoose')



mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})

// MIDDLEWARE
app.set('views', __dirname + '/views')
app.use(express.static('public'))
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use('/breads', breadsController)

app.get('/', (req, res) => {
    res.send('Welcome to an Awesome App about Breads!')
})

app.listen(PORT, () => {
 console.log('listening on port', PORT);   
})

app.get('*', (req, res) => {
    res.send('404')
})

