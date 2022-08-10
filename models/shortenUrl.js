const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortenUrlSchema = new Schema ({
  url: {
    type: String,
    required: true
  },
  new_url:{
    type: String,
    require: true
  }
})

module.exports = mongoose.model('ShortenUrl', shortenUrlSchema)