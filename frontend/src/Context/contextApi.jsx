import React, { createContext, useState } from "react";

export const ContextApi = createContext()

export const ContextApiProvider = ({ children }) => {
    // const [roomKey, setRoomKey] = useState('')
    const [userName, setUserName] = useState([])

    return (
        <ContextApi.Provider value={{ userName, setUserName }}>
            {children}
        </ContextApi.Provider>
    )
}