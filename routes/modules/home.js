const express = require('express')
const router = express.Router()
const ShortenUrl = require('../../models/shortenUrl') //model
const generateShortenUrl = require('../../generateShortenUrl') //產生五位英數字

router.get('/', (req, res) => {
  res.render('index')
})

//找到回傳，沒找到則新增
router.post('/', (req, res) => {
  const shortenUrl = generateShortenUrl()
  const originalUrl = req.body.url
  
  
  let option = { upsert: true }
  return ShortenUrl.findOneAndUpdate({ url: originalUrl }, {
    $setOnInsert: {
      url: originalUrl,
      new_url: shortenUrl
    }
  }, option)
    .lean()
    .then(data => {
      let shortUrl = data.new_url
      let url = data.url
      return res.render('index', { shortUrl, url })
    })
    .catch(err => console.log(err))
})



module.exports = router