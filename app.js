const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const port = 3000
const bodyParser = require('body-parser')
const generateShortenUrl = require('./generateShortenUrl') //產生五位英數字
const ShortenUrl = require('./models/shortenUrl')  //model


app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs'}))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))

// db連線設定
const mongoose = require('mongoose')
const db = mongoose.connection
mongoose.connect(process.env.MONGODB_URI)
db.on('error', () => {
  console.log('error')
})
db.once('open', () => {
  console.log('db connection is on now!')
})


app.get('/', (req, res) => {
  res.render('index')
})



app.post('/', (req, res) => {
  const url = generateShortenUrl()
  const originalUrl = req.body.url
  console.log(originalUrl)
  return ShortenUrl.create(originalUrl)
      .then(() => res.render('index', { url }))
      .catch(err => console.log(err))
     
})
app.listen(port, (req, res) => {
  console.log(`It is running on http://localhost:${port}`)
})


// return ShortenUrl.find()
//   .lean()
//   .then(urlData => {
//     const filteredUrl = urlData.find(item => item.url === originalUrl)
//     console.log(filteredUrl)
//     filteredUrl.length === 0 ? res.render('index', { originalUrl }) : res.render('index', { filteredUrl })
//   }
//     .catch(err => console.log(err))
// })   
//   )