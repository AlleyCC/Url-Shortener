const express = require('express')
const router = express.Router()
const ShortenUrl = require('../../models/shortenUrl')
const generateShortenUrl = require('../../generateShortenUrl')


router.get('/:url', (req, res) => {
  const url = req.params
  // console.log(url)
  return ShortenUrl.find({url: url})
    .lean()
    .then(data => {
      // console.log(data.url)
      return res.redirect(data.url)
    })
    .catch(err => console.log(err))
})

router.get('/:url', (req, res) => {
  const url = req.params
  console.log(url)
  return ShortenUrl.find(url)
    .lean()
    .then(data => res.redirect(`${data.url}`))
    .catch(err => console.log(err))
})


module.exports = router