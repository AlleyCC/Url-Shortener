const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const PORT = process.env.PORT || 3000
const bodyParser = require('body-parser')
const routes = require('./routes/index')
require('./config/mongoose')

app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

app.listen(PORT, (req, res) => {
  console.log(`It is running on http://localhost:${PORT}`)
})


