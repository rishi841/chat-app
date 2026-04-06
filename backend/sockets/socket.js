const chatSocket = (io) => {
  io.on('connection', (socket) => {

    socket.on('join-room', (roomId) => {
      socket.join(roomId)
    })

    socket.on('send-message', ({ roomId, message, sender }) => {
      io.to(roomId).emit('receive-message', {
        message,
        sender
      })
    })

  })
}

module.exports = chatSocket