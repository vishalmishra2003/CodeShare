import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SocketContext } from './Context/SocketContext';

const Home = () => {
    const { socket } = useContext(SocketContext);
    useEffect(() => {
        if (!socket) return;
        const handleConnect = () => {
            console.log(`Socket ID: ${socket.id}`);
        };
        socket.on('connect', handleConnect);
        return () => {
            socket.off('connect', handleConnect);
        };
    }, [socket]);

    return (
        <div>
            <h1>Home Page</h1>
            <button>
                <Link to="/Joinroom">Join Room</Link>
            </button>
            <button>
                <Link to="/Createroom">Create Room</Link>
            </button>
        </div>
    );
};

export default Home;
