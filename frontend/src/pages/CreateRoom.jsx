import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const CreateRoom = () => {
  const [link, setLink] = useState('')
  const [loading, setLoading] = useState(false)

  function createroom() {
    setLoading(true)

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
         const API = "https://chat-app-back-kf9x.onrender.com"

                  const res = await axios.post(`${API}/room/create`, {
                 lat: coords.latitude,
                 long: coords.longitude
})

          setLink(res.data.link)
        } catch (err) {
          console.log("Axios error:", err)
          alert("Backend connect nahi ho raha")
        } finally {
          setLoading(false)
        }
      },
      (err) => {
        console.log("Location error:", err)
        alert("Location permission allow karo")
        setLoading(false)
      }
    )
  }

  return (
    <div className="h-screen flex items-center justify-center bg-linear-to-br from-gray-900 to-gray-800 text-white">
      
      <div className="bg-gray-950 p-8 rounded-2xl shadow-xl w-[90%] max-w-md text-center">
        
        <h1 className="text-2xl font-bold mb-6">Create a Room</h1>

        <button
          onClick={createroom}
          className="w-full bg-blue-600 hover:bg-blue-700 transition duration-200 py-3 rounded-lg font-semibold"
        >
          {loading ? "Creating..." : "Create Room"}
        </button>

        {link && (
          <div className="mt-6">
            <p className="text-sm text-gray-400 mb-2">Room Link</p>
            <Link
              to={link}
              className="block bg-gray-800 p-3 rounded-lg text-blue-400 break-all hover:underline"
            >
              {link}
            </Link>
          </div>
        )}

      </div>
    </div>
  )
}

export default CreateRoom