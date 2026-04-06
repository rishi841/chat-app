import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { io } from 'socket.io-client'
import { useParams } from 'react-router-dom'

const JoinRoom = () => {
  const { roomId } = useParams()

  const [message, setMessage] = useState('')
  const [chat, setChat] = useState([])
  const [socket, setSocket] = useState(null)
  const [name, setName] = useState('')

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async ({ coords }) => {
      let res = await axios.post(`http://127.0.0.1:3000/room/join/${roomId}`, {
        lat: coords.latitude,
        long: coords.longitude
      })

      if (res.data.message === 'allowed') {
        const s = io('http://127.0.0.1:3000')

        s.emit('join-room', roomId)

        s.on('receive-message', (msg) => {
          setChat(prev => [...prev, msg])
        })

        setSocket(s)
      } else {
        alert('You are outside the range')
      }
    })
  }, [])

  const sendMessage = (e) => {
    e.preventDefault()
    if (!socket || !message || !name) return

    socket.emit('send-message', {
      roomId,
      message,
      sender: name
    })

    setMessage('')
  }

  return (
    <div className="h-screen flex flex-col bg-linear-to-br from-gray-900 to-gray-800 text-white">

      {/* Header */}
      <div className="p-3 bg-gray-950 text-center font-semibold">
        Room: {roomId}
      </div>

      {/* Name Input */}
      <div className="p-3 bg-gray-900">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 rounded text-white"
        />
      </div>

      {/* Chat */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {chat.map((item, index) => {
          const isMe = item.sender === name

          return (
            <div key={index} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
              <div>
                <p className="text-xs text-gray-400">{item.sender}</p>
                <p className={`px-4 py-2 rounded-2xl ${
                  isMe ? "bg-green-500" : "bg-blue-600"
                }`}>
                  {item.message}
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Input */}
      <form onSubmit={sendMessage} className="p-3 flex gap-2 bg-gray-950">
        <input
          type="text"
          placeholder="Type message..."
          className="flex-1 p-2 rounded text-white"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="bg-blue-600 px-4 py-2 rounded">
          Send
        </button>
      </form>
    </div>
  )
}

export default JoinRoom