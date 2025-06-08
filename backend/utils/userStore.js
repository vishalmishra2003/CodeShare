const users = {};

function addUser(socketId, roomId, username) {
    users[socketId] = { roomId, username };
}

function getUser(socketId) {
    return users[socketId] || {};
}

function removeUser(socketId) {
    delete users[socketId];
}

module.exports = {
    addUser,
    getUser,
    removeUser,
};
