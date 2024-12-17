import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SocketContext } from '../../Context/SocketContext'

const Createroom = () => {
    const [key, setKey] = useState('')
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()

    useEffect(() => {
        const generateRandomKey = () => {
            const randomKey = Math.floor(1000 + Math.random() * 9000)
            setKey(randomKey)
        }

        if (socket) {
            generateRandomKey()
            socket.on('connect', generateRandomKey)

            const interval = setInterval(() => {
                generateRandomKey()
            }, 10000)

            return () => {
                socket.off('connect', generateRandomKey)
                clearInterval(interval)
            }
        }
    }, [socket])

    const joinCreatedRoom = () => {
        if (socket && key) {
            socket.emit('create-room', { key })
            navigate('/Screen')
        }
    }

    return (
        <div>
            <h1>Create Room</h1>
            <input type="text" value={key} readOnly />
            <button onClick={joinCreatedRoom}>Create Room</button>
        </div>
    )
}

export default Createroom
