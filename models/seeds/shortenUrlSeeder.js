const mongoose = require('mongoose')
const shortenUrl = require('../shortenUrl')
const db = mongoose.connection
mongoose.connect(process.env.MONGODB_URI)
db.on('error', () => {
  console.log('error')
})
db.once('open', () => {
  console.log('db connection is on now!')
})
