import React, { useContext, useState, useEffect } from 'react';
import { SocketContext } from '../Context/SocketContext';
import Chat from './Chat';

const Screen = () => {
    const { socket } = useContext(SocketContext);
    const [value, setValue] = useState('');

    useEffect(() => {
        if (socket) {
            socket.on('update-input', (data) => {
                setValue(data);
            });

            return () => {
                socket.off('update-input');
            };
        }
    }, [socket]);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setValue(value);
        if (socket) {
            socket.emit('inputChange', value);
        }
    };

    return (
        <div className="screen-container">
            <div className="screen-input">
                <h1>Share Screen</h1>
                <textarea
                    type="text"
                    id="code"
                    value={value}
                    onChange={handleInputChange}
                    placeholder="Type to share..."
                />
            </div>
            <div className="chat-container-wrapper">
                <Chat />
            </div>
        </div>
    );
};

export default Screen;
