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

const userData = {}

io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);
    socket.on('inputChange', (data) => {
        socket.broadcast.emit('update-input', data);
    });

    socket.on('create-room', ({ roomId, username }) => {
        if (roomId && username) {
            console.log(`Room Created: ${roomId} by ${username}`);
            socket.join(roomId);
            userData[socket.id] = {roomId, username}
            socket.to(roomId).emit('room-created', { id: roomId, createdUser: username, message: 'Room Created' });
        }
    });

    socket.on('join-room', (data, callback) => {
        const roomKey = data.roomId;
        const username = data.username;
    
        const room = io.sockets.adapter.rooms.get(roomKey);
    
        if (room && room.size > 0) {  // <-- Check if room exists and has at least 1 socket
            socket.join(roomKey);
            console.log(`User ${username} joined room: ${roomKey}`);
            userData[socket.id] = { roomId: roomKey, username };
            callback({ success: true });
        } else {
            callback({ success: false, message: 'Room does not exist' });
        }
    });
    
    socket.on('send-message', (message) => {
        const timestamp = new Date().toLocaleTimeString();
        const {roomId, username} = userData[socket.id];
        if(roomId){
            io.to(roomId).emit('receive-message', {
                text: message,
                sender: username,
                timestamp,
            });
        }
    });

    socket.on('disconnect', () => {
        console.log(`Socket disconnected: ${socket.id}`);
        delete userData[socket.id];
    });
});

server.listen(process.env.PORT, () => {
    console.log(`Connected to Port ${process.env.PORT}`);
});
