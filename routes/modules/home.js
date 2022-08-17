const express = require('express')
const router = express.Router()
const ShortenUrl = require('../../models/shortenUrl') //model
const generateShortenUrl = require('../../generateShortenUrl') //產生五位英數字
const validateUrl = require('url-validation')
const baseUrl = require('../../config/mongoose')

router.get('/', (req, res) => {
  res.render('index')
})

//找到回傳，沒找到則新增
router.post('/', (req, res) => {
  const urlCode = generateShortenUrl()
  const originalUrl = req.body.url
  const option = { upsert: true }
  if (validateUrl(originalUrl)) {
    return ShortenUrl.findOneAndUpdate({ url: originalUrl }, {
      $setOnInsert: {
        url: originalUrl,
        new_url: urlCode,
      }
    }, option)
      .lean()
      .then(data => {
        const code = data.new_url
        return res.render('index', { code, baseUrl })
      })
      .catch(err => console.log(err))
  } else {
    return res.render('index', { alert: '請輸入有效網址' })
  }
})

router.get('/:code', (req, res) => {
  const code = req.params.code
  return ShortenUrl.findOne({ new_url: code })
    .lean()
    .then(data => {
      if (!data) return res.render('index', { alert: 'Error! Cannot find this URL!' })
      return res.redirect(data.url)
    })
    .catch(err => console.log(err))
})

module.exports = router