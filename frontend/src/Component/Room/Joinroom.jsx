import React from 'react'
import { Link } from 'react-router-dom'

const Joinroom = () => {
    return (
        <div>
            <h1>Join Room</h1>
            <input type="text" placeholder='Enter Joining Code' />
            <button>
                <Link to="/Screen">Join Room</Link>
            </button>
        </div>
    )
}

export default Joinroom
