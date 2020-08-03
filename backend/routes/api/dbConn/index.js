const router = require('express').Router()
const controller = require('./dbconn.controller')


router.get('/list', controller.getCyjson)
router.post('/write',controller.writeCyjson)


module.exports = router