const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const newUrl = require('./modules/newUrl')
router.use('/', home)
router.use('/:url', newUrl)

module.exports = router