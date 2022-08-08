const express = require('express')
const app = express()
const {engine} = require('express-handlebars')
const port = 3000


app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, (req, res) => {
  console.log(`It is running on http://localhost:${port}`)
})