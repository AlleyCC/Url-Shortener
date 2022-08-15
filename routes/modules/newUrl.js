const express = require('express')
const router = express.Router()
const ShortenUrl = require('../../models/shortenUrl')


router.get('/:code', (req, res) => {
  const code = req.params.code
  return ShortenUrl.find()
    .lean()
    .then(data => {
      const filteredUrl = data.find(item => item.urlCode === code )
      const originalUrl = filteredUrl.url
      return res.redirect(originalUrl)
      })
    .catch(err => console.log(err))
})


module.exports = router