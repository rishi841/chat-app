require("dotenv").config()
const express=require("express")
const app=express()
const cors = require('cors')
const {createServer}=require("http")
const {Server}=require("socket.io")
const chatSocket = require("./sockets/socket")
const connectdb = require("./config/db")
const roomRoutes=require("./routes/room.routes")

const expServer= createServer(app)
connectdb()
app.use(cors())
app.use(express.json())
app.use('/room',roomRoutes)

let io=new Server(expServer,{
    cors:{
        origin:"*",}
})

chatSocket(io)
expServer.listen(3000,()=>{
    console.log("server is running on port 3000")
})