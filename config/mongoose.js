// db連線設定
const mongoose = require('mongoose')
const db = mongoose.connection
const baseUrl = 'https://a-cutter.herokuapp.com'
mongoose.connect(process.env.MONGODB_URI)
db.on('error', () => {
  console.log('error')
})
db.once('open', () => {
  console.log('MONGODB is on now!')
})

module.exports = db
module.exports = baseUrl