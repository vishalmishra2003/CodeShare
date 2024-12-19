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
    console.log(`Socket connected: ${socket.id}`);
    socket.on('inputChange', (data) => {
        socket.broadcast.emit('update-input', data);
    });

    socket.on('create-room', (data) => {
        socket.emit('room-key', data);
        console.log("Room Key : ", data)
        socket.on('sent-room-key', (key) => {
            if (data === key) {
                socket.on('join-room', (roomkey) => {
                    socket.to(roomkey).emit('room-joined', { msg: "Joined Room" })
                })
            }
        })
    })

    socket.on('send-message', (message) => {
        socket.broadcast.emit('receive-message', message)
    })
    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
    });
});

server.listen(process.env.PORT, () => {
    console.log(`Connected to Port ${process.env.PORT}`)
})