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
            <Link to="/Joinroom">
                <button>
                    Join Room
                </button>
            </Link>
            <Link to="/Createroom">
                <button>
                    Create Room
                </button>
            </Link>
        </div>
    );
};

export default Home;
