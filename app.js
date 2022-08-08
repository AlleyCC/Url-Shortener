const express = require('express')
const app = express()
const {engine} = require('express-handlebars')
const port = 3000
const generateShortenUrl = require('./generateShortenUrl')

app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  const url = generateShortenUrl
  
  res.render('index', { url })
})

app.listen(port, (req, res) => {
  console.log(`It is running on http://localhost:${port}`)
})