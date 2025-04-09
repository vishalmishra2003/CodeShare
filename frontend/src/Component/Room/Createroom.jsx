import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../../Context/SocketContext';
import { ContextApi } from '../../Context/contextApi';

const Createroom = () => {
    const [roomKey, setRoomKey] = useState('');
    const [userName, setUserName] = useState('');
    // const { userName, setUserName } = useContext(ContextApi)
    const { socket } = useContext(SocketContext);
    const navigate = useNavigate();

    useEffect(() => {
        const generateRandomKey = () => {
            const randomKey = (Math.floor(1000 + Math.random() * 9000)).toString();
            setRoomKey(randomKey);
        };

        if (socket) {
            generateRandomKey();
            const handleConnect = () => generateRandomKey();
            socket.on('connect', handleConnect);

            return () => {
                socket.off('connect', handleConnect);
            };
        }
    }, [socket]);
    
    const joinCreatedRoom = () => {
        if (socket && userName.trim()) {
            socket.emit('create-room', { roomId: roomKey, username: userName });
            navigate('/Screen');
        } else {
            alert('Please enter a valid username');
        }
    };

    return (
        <div>
            <h1>Create Room</h1>
            <label>Room Key: </label>
            <input type="text" value={roomKey} readOnly />
            <label>Enter Username: </label>
            <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)} //(prevUser) => [...prevUser, { newUser: e.target.value }]
            />
            <button onClick={joinCreatedRoom}>Create Room</button>
        </div>
    );
};

export default Createroom;