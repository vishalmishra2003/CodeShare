import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../../Context/SocketContext';
import { KeyContext } from '../../Context/KeyContext';

const Joinroom = () => {
    const { roomKey } = useContext(KeyContext);
    const { socket } = useContext(SocketContext);
    const navigate = useNavigate();
    const [key, setKey] = useState('');

    const joinroom = () => {
        console.log("Key : " + key + "\nRoomKey :" + roomKey);
        socket.on('room-key', (code) => {
            setKey(code)
        })
        console.log("CODE : ", key)
        if (key === roomKey) {
            socket.emit('sent-room-key', key);
            navigate('/Screen'); // Navigate to the room's screen after joining
        } else {
            alert("No Such Room");
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
            <button onClick={joinroom}>Join Room</button>
        </div>
    );
};

export default Joinroom;