const router = require('express').Router()
const controller = require('./dbconn.controller')


router.get('/list', controller.getCyjson)


module.exports = router