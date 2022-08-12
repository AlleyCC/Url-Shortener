const express = require('express')
const router = express.Router()
const ShortenUrl = require('../../models/shortenUrl')
const generateShortenUrl = require('../../generateShortenUrl')
const baseUrl = 'https://localhost:3000'
// https://a-cutter.herokuapp.com/

router.get('/:code', (req, res) => {
  const code = req.params.code
  console.log(typeof(code))
  return ShortenUrl.find()
    .lean()
    .then(data => {
      const filteredUrl = data.find(item => item.urlCode === code )
      return res.redirect(filteredUrl.url)
      })
    .catch(err => console.log(err))
})


module.exports = router