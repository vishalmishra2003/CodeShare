import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../../Context/SocketContext';
import { ContextApi } from '../../Context/contextApi';

const Joinroom = () => {
    const [key, setKey] = useState('');
    // const { userName, setUserName } = useContext(ContextApi);
    const [userName, setUserName] = useState('');
    const { socket } = useContext(SocketContext);
    const navigate = useNavigate();

    const joinRoom = () => {
        if (socket && key.trim() && userName.trim()) {
            socket.emit('join-room', { roomId: key, username: userName }, (response) => {
                if (response.success) {
                    navigate('/Screen');
                } else {
                    alert(response.message || 'Failed to join the room');
                }
            });
        } else {
            alert('Please enter a valid room key and username');
        }
    };

    return (
        <div>
            <h1>Join Room</h1>
            <input
                type="text"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Enter Joining Code"
            />
            <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)} //(prevUser) => [...prevUser, { newUser: e.target.value }]
                placeholder="Enter User Name"
            />
            <button onClick={joinRoom}>Join Room</button>
        </div>
    );
};

export default Joinroom;
