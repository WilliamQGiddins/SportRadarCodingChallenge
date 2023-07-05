import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function GameStats() {

    const [gameId, setGameId] = useState([]);
    const [playerId, setPlayerId ] = useState([]);

    const handleGameIdChange = (event) => {
        setGameId(event.target.value);
    };

    const handlePlayerIdChange = (event) => {
        setPlayerId(event.target.value);
    };

    return (
        <div className='container'>
            <div className='py-4'>
            <div className='py-4'>
                Search for GameStats By Player
            </div>
                <form>
                    <label>
                        GameId: 
                        <input type="text" name="GameId" placeholder='2017020001' onChange={handleGameIdChange} value={gameId}/>
                    </label>
                </form>
                <form>
                    <label>
                        PlayerId: 
                        <input type="text" name="PlayerId" placeholder='8474709' onChange={handlePlayerIdChange} value={playerId}/>
                    </label>
                </form>
                <Link className='btn btn-primary mx-2'
                    to={`/viewgamestats/${gameId}/${playerId}`}>
                        Search
                </Link>
            </div>
        </div>
    );
}

