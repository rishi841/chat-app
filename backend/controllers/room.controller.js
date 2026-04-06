const roomModel = require('../models/room.model')
const calculateDistance = require('../utils/CalculateDistance')

async function createRoom(req, res) {
  const { lat, long } = req.body

  if (!lat || !long) {
    return res.status(400).json({
      message: 'lat and long is required'
    })
  }

  const roomId = Math.random().toString(36).substring(2, 10)

  const newRoom = await roomModel.create({
    lat: Number(lat),
    long: Number(long),
    roomId,
    radius: 5
  })

  return res.status(200).json({
    link: `/room/join/${roomId}`,  // ✅ clean link
    room: newRoom
  })
}

async function canJoinRoom(req, res) {
  const { lat, long } = req.body
  const { roomId } = req.params

  if (!lat || !long) {
    return res.status(400).json({
      message: 'lat and long is required'
    })
  }

  const room = await roomModel.findOne({ roomId })

  if (!room) {
    return res.status(404).json({
      message: 'room not found'
    })
  }

  const distance = calculateDistance(
    Number(lat),
    Number(long),
    Number(room.lat),
    Number(room.long)
  )

  console.log("Distance:", distance)

  if (distance > room.radius) {
    return res.status(400).json({
      message: 'you are outside the range'
    })
  }

  return res.status(200).json({
    message: 'allowed'
  })
}

module.exports={
   canJoinRoom,
   createRoom,
}