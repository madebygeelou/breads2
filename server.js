const app = express()
const express = require('express')
require('dotenv').config()
const PORT = process.env.PORT
const methodOverride = require('method-override')
const breadsController = require('./controllers/breads_controller.js')



// MIDDLEWARE
app.set('views', __dirname + '/views')
app.use(express.static('public'))
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

app.get('*', (req, res) => {
    res.send('404')
})

app.get('/', (req, res) => {
    res.send('Welcome to an Awesome App about Breads!')
})


app.use('/breads', breadsController)

app.listen(PORT, () => {
 console.log('listening on port', PORT);   
})

