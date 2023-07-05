import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PlayerInfo() {

    const [playerId, setPlayerId] = useState([]);

    const handlePlayerIdChange = (event) => {
        setPlayerId(event.target.value);
    };

    return (
        <div className='container'>
            <div className='py-4'>
            <div className='py-4'>
                Search for PlayerInfo
            </div>
                <form>
                    <label>
                        PlayerId: 
                        <input type="text" name="PlayerId" placeholder='8474709' onChange={handlePlayerIdChange} value={playerId}/>
                    </label>
                </form>
                <Link className='btn btn-primary mx-2'
                    to={`/viewplayerinfo/${playerId}`}>
                        Search
                </Link>
            </div>
        </div>
    );
}

