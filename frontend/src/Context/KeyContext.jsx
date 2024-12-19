import React, { createContext, useState } from "react";

export const KeyContext = createContext()

export const KeyProvider = ({ children }) => {
    const [roomKey, setRoomKey] = useState('')
    return (
        <KeyContext.Provider value={{ roomKey, setRoomKey }}>
            {children}
        </KeyContext.Provider>
    )
}