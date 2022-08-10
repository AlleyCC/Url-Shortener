const express = require('express')
const app = express()
const { engine } = require('express-handlebars')
const PORT = process.env.PORT || 3000
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


//找到回傳，沒找到則新增
app.post('/', (req, res) => {
  const shortenUrl = generateShortenUrl()
  const originalUrl = req.body.url
  console.log(originalUrl)
  console.log(shortenUrl)
  let option = { upsert: true}
  return ShortenUrl.findOneAndUpdate({ url: originalUrl },{ $setOnInsert: {
    url: originalUrl,
    new_url: shortenUrl}},
    option)
    .lean()
    .then(data => {
      let newUrl = data.new_url
      return res.render('index', { newUrl })
    })
    .catch(err => console.log(err))

})

app.listen(PORT, (req, res) => {
  console.log(`It is running on http://localhost:${PORT}`)
})


