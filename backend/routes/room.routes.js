const express = require('express')
const router = express.Router()
const roomController = require('../controllers/room.controller')

router.post('/create',roomController.createRoom)
router.post('/join/:roomId',roomController.canJoinRoom)


module.exports = router