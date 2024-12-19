import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../../Context/SocketContext';
import { KeyContext } from '../../Context/KeyContext';

const Createroom = () => {
    const { roomKey, setRoomKey } = useContext(KeyContext);
    const { socket } = useContext(SocketContext);
    const navigate = useNavigate();

    useEffect(() => {
        const generateRandomKey = () => {
            const randomKey = Math.floor(1000 + Math.random() * 9000);
            setRoomKey(randomKey);
        };

        if (socket) {
            generateRandomKey();

            const handleConnect = () => generateRandomKey();

            socket.on('connect', handleConnect);

            const interval = setInterval(() => {
                generateRandomKey();
            }, 10000);

            return () => {
                socket.off('connect', handleConnect);
                clearInterval(interval);
            };
        }
    }, [socket, setRoomKey]);

    const joinCreatedRoom = () => {
        if (socket && roomKey) {
            socket.emit('create-room', roomKey);
            navigate('/Screen'); // Navigate to the room's screen after creating
        }
    };

    return (
        <div>
            <h1>Create Room</h1>
            <input type="text" value={roomKey || ''} readOnly />
            <button onClick={joinCreatedRoom}>Create Room</button>
        </div>
    );
};

export default Createroom;
