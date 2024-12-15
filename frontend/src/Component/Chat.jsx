import React from 'react';

const Chat = () => {
    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2>Chat Room</h2>
            </div>
            <div className="chat-messages">
                <div className="message received">  </div>
                <div className="message sent"></div>
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    className="message-input"
                    placeholder="Type your message..."
                />
                <button className="send-button">Send</button>
            </div>
        </div>
    );
};

export default Chat;
