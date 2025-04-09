import React, { useContext, useState, useEffect } from 'react';
import { SocketContext } from '../Context/SocketContext';

const Chat = () => {
    const { socket } = useContext(SocketContext);
    const [msg, setMsg] = useState('');
    const [messages, setMessages] = useState([]);
    const [userName, setUserName] = useState(''); // Current logged-in user's name

    const sendMessage = () => {
        if (socket && msg.trim()) {
            socket.emit('send-message', msg);  // Only send the message
            setMsg('');
        }
    };

    useEffect(() => {
        if (!socket) return;

        socket.on('room-created', (data) => {
            console.log(data.createdUser);
            setUserName(data.createdUser);
        });

        const handleReceiveMessage = (message) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    text: message.text,
                    sender: message.sender,
                    timestamp: message.timestamp,
                    type:'received',
                    isOwnMessage: message.sender === userName
                }
            ]);
        };

        socket.on('receive-message', handleReceiveMessage);

        return () => {
            socket.off('receive-message', handleReceiveMessage);
        };
    }, [socket, userName]);

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2>Chat Room</h2>
                <span>{userName ? `Welcome, ${userName}` : 'Loading username...'}</span>
            </div>
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div key={index} className={message.type=='received'?'message received':'message  sent'}>
                        <div>
                            <strong>{message.isOwnMessage ? 'You' : message.sender}</strong>: {message.text}
                            <span style={{ marginLeft: '10px', fontSize: '0.8rem', color: '#666' }}>{message.timestamp}</span>
                        </div>
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
