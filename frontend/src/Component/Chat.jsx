import React, { useContext, useState, useEffect } from 'react';
import { SocketContext } from '../Context/SocketContext';

const Chat = () => {
    const { socket } = useContext(SocketContext);
    const [msg, setMsg] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        socket.emit('send-message', msg);
        setMessages((prevMessages) => [...prevMessages, { text: msg, type: 'sent' }]);
        setMsg('');
    };

    useEffect(() => {
        if (!socket) return
        const handleReceiveMessage = (message) => {
            setMessages((prevMessages) => [...prevMessages, { text: message, type: 'received' }]);
        };

        socket.on('receive-message', handleReceiveMessage);
        socket.emit('send-emessage', msg)

        return () => {
            socket.off('receive-message', handleReceiveMessage);
        };
    }, [socket]);

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2>Chat Room</h2>
            </div>
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div key={index} className={`message ${message.type}`}>
                        {message.text}
                    </div>
                ))}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    className="message-input"
                    placeholder="Type your message..."
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                />
                <button className="send-button" onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chat;
