const { Server } = require('socket.io');
const userStore = require('../utils/userStore');

module.exports = function (server) {
    const io = new Server(server, {
        cors: {
            origin: process.env.CLIENT,
            credentials: true,
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        console.log(`Socket connected: ${socket.id}`);

        socket.on('inputChange', (data) => {
            socket.broadcast.emit('update-input', data);
        });

        socket.on('create-room', ({ roomId, username }) => {
            if (roomId && username) {
                socket.join(roomId);
                userStore.addUser(socket.id, roomId, username);
                socket.to(roomId).emit('room-created', {
                    id: roomId,
                    createdUser: username,
                    message: 'Room Created',
                });
            }
        });

        socket.on('join-room', ({ roomId, username }, callback) => {
            const room = io.sockets.adapter.rooms.get(roomId);
            if (room && room.size > 0) {
                socket.join(roomId);
                userStore.addUser(socket.id, roomId, username);
                callback({ success: true });
            } else {
                callback({ success: false, message: 'Room does not exist' });
            }
        });

        socket.on('send-message', (message) => {
            const { roomId, username } = userStore.getUser(socket.id);
            if (roomId) {
                io.to(roomId).emit('receive-message', {
                    text: message,
                    sender: username,
                    timestamp: new Date().toLocaleTimeString(),
                });
            }
        });

        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`);
            userStore.removeUser(socket.id);
        });
    });
};
