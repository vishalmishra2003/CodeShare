import React, { createContext, useState, useEffect } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // AWS : http://44.205.254.223:3000/ || Local :http://localhost:3000
        const newsocket = io(import.meta.env.VITE_BACKEND_URL);
        setSocket(newsocket);

        return () => {
            newsocket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};
