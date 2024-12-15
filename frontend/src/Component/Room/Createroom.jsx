import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Createroom = () => {
    const [key, setKey] = useState('')

    useEffect(() => {
        const randomKey = Math.floor(Math.random() * 1000)
        setKey(randomKey)
    })

    return (
        <div>
            <h1>Createroom</h1>
            <input type="text" value={key} />
            <button>
                <Link to='/Screen'>Create Room</Link>
            </button>
        </div>
    )
}

export default Createroom
