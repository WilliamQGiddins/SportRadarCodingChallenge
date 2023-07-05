import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function TeamStats() {

    const [teamId,  setTeamId] = useState([]);
    const [season,  setSeason] = useState([]);

    const handleTeamIdChange = (event) => {
        setTeamId(event.target.value);
    };

    const handleSeasonChange = (event) => {
        setSeason(event.target.value);
    };

    return (
        <div className='container'>
            <div className='py-4'>
            <div className='py-4'>
                Search for TeamStats By Season
            </div>
                <form>
                    <label>
                        TeamId: 
                        <input type="text" name="TeamId" placeholder='10' onChange={handleTeamIdChange} value={teamId}/>
                    </label>
                </form>
                <form>
                    <label>
                        Season:
                        <input type="text" name="Season" placeholder='20172018' onChange={handleSeasonChange} value={season}/>
                    </label>
                </form>
                <Link className='btn btn-primary mx-2'
                    to={`/viewteamstats/${teamId}/${season}`}>
                        Search
                </Link>
            </div>
        </div>
    );
}

