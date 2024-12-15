require('dotenv').config();
const express = require('express')
const cors = require('cors')
const { Server } = require('socket.io')
const http = require('http')


const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT,
        credentials: true,
        methods: "[GET, POST]"
    }
})

app.use(cors())

io.on('connection', (socket) => {
    console.log(`Socket : ${socket.id}`)
    socket.on('inputChange', (data) => {
        socket.broadcast.emit('update-input', data)
    })
})

server.listen(process.env.PORT, () => {
    console.log(`Connected to Port ${process.env.PORT}`)
})