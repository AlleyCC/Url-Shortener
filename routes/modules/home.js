const express = require('express')
const router = express.Router()
const ShortenUrl = require('../../models/shortenUrl') //model
const generateShortenUrl = require('../../generateShortenUrl') //產生五位英數字
const baseUrl = 'https://a-cutter.herokuapp.com'
const validateUrl = require('url-validation')

router.get('/', (req, res) => {
  res.render('index')
})

//找到回傳，沒找到則新增
router.post('/', (req, res) => { 
  const urlCode = generateShortenUrl()
  const shortenUrl = baseUrl + '/' + urlCode
  const originalUrl = req.body.url
  const option = { upsert: true }
  if (validateUrl(originalUrl)){
    return ShortenUrl.findOneAndUpdate({ url: originalUrl }, {
      $setOnInsert: {
        url: originalUrl,
        new_url: shortenUrl,
        urlCode: urlCode,
      }
    }, option)
      .lean()
      .then(data => {
        const code = data.urlCode
        const shortUrl = data.new_url
        return res.render('index', { code, shortUrl })
      })
      .catch(err => console.log(err))
  } else {
    return res.render('index', { alert: '請輸入有效網址' })
  }
  
  
})

module.exports = router