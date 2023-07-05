import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PlayerStats() {

    const [playerId, setPlayerId ] = useState([]);
    const [season, setSeason ] = useState([]);

    const handlePlayerIdChange = (event) => {
        setPlayerId(event.target.value);
    };

    const handleSeasonChange = (event) => {
        setSeason(event.target.value);
    };

    return (
        <div className='container'>
            <div className='py-4'>
            <div className='py-4'>
                Search for PlayerStats By Season
            </div>
                <form>
                    <label>
                        PlayerId: 
                        <input type="text" name="PlayerId" placeholder='8474709' onChange={handlePlayerIdChange} value={playerId}/>
                    </label>
                </form>
                <form>
                    <label>
                        Season:
                        <input type="text" name="Season" placeholder='20172018' onChange={handleSeasonChange} value={season}/>
                    </label>
                </form>
                <Link className='btn btn-primary mx-2'
                    to={`/viewplayerstats/${playerId}/${season}`}>
                        Search
                </Link>
            </div>
        </div>
    );
}

