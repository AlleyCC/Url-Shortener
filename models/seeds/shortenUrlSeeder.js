const mongoose = require('mongoose')
const ShortenUrl = require('../shortenUrl')
const db = mongoose.connection
mongoose.connect(process.env.MONGODB_URI)
db.on('error', () => {
  console.log('error')
})
db.once('open', () => {
  console.log('db connection is on now!')
})
