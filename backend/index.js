require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT,
        credentials: true,
        methods: ['GET', 'POST']
    }
});

app.use(cors());

io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    socket.on('inputChange', (data) => {
        socket.broadcast.emit('update-input', data);
    });

    socket.on('create-room', ({ roomId, username }) => {
        if (roomId && username) {
            console.log(`Room Created: ${roomId} by ${username}`);
            socket.join(roomId);
            socket.to(roomId).emit('room-created', { id: roomId, username:username,message: 'Room Created' });
        }
    });

    socket.on('join-room', (roomId, callback) => {
        const rooms = Array.from(io.sockets.adapter.rooms.keys());
        if (rooms.includes(roomId)) {
            socket.join(roomId);
            console.log(`User joined room: ${roomId}`);
            callback({ success: true });
        } else {
            callback({ success: false, message: 'Room does not exist' });
        }
    });

    socket.on('send-message', (message,username) => {
        const timestamp = new Date().toLocaleTimeString();
        socket.broadcast.emit('receive-message', {text:message,sender:username,timestamp});
    });

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
    });
});

server.listen(process.env.PORT, () => {
    console.log(`Connected to Port ${process.env.PORT}`);
});
