import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios';

export default function ViewPlayerInfo() {

    const [player, setPlayerInfo] = useState({
        id: '',
        full_name: '',
        primary_number: '',
        birth_date: '',
        current_age: '',
        birth_city: '',
        birth_county: '',
        nationality: '',
        height: '',
        player_weight: '',
        active: '',
        alternate_captain: '',
        captain: '',
        rookie: '',
        shoots_catches: '',
        roster_status: '',
        current_team: '',
        primary_position: ''
    });

    const { playerId } = useParams();

    useEffect(() => {
        loadPlayerInfo();
    }, []);

    const loadPlayerInfo = async () => {
        const result = await axios.get(`http://localhost:8080/api/v1/player?playerId=${playerId}`);
        if(result?.data[0]){
            setPlayerInfo(result.data[0]);
        }
    };

    const handleBoolean = (flag) => { 
        if(flag) {
            return 'Yes'
        } return 'No'
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Player Info Sheet</h2>
                    <div className='card'>
                        <div className='card-header'>
                            Player Info:
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <b>PlayerId:</b>
                                    {player.id}
                                </li>
                                <li className='list-group-item'>
                                    <b>Name:</b>
                                    {player.full_name}
                                </li>
                                <li className='list-group-item'>
                                    <b>PrimaryNumber:</b>
                                    {player.primary_number}
                                </li>
                                <li className='list-group-item'>
                                    <b>BirthDate:</b>
                                    {player.birth_date}
                                </li>
                                <li className='list-group-item'>
                                    <b>CurrentAge:</b>
                                    {player.current_age}
                                </li>
                                <li className='list-group-item'>
                                    <b>BirthCity:</b>
                                    {player.birth_city}
                                </li>
                                <li className='list-group-item'>
                                    <b>BirthCounty:</b>
                                    {player.birth_county}
                                </li>
                                <li className='list-group-item'>
                                    <b>Nationality:</b>
                                    {player.nationality}
                                </li>
                                <li className='list-group-item'>
                                    <b>Height:</b>
                                    {player.height}
                                </li>
                                <li className='list-group-item'>
                                    <b>Weight:</b>
                                    {player.player_weight}
                                </li>
                                <li className='list-group-item'>
                                    <b>Active:</b>
                                    {handleBoolean(player.active)}
                                </li>
                                <li className='list-group-item'>
                                    <b>AlternateCaptain:</b>
                                    {handleBoolean(player.alternate_captain)}
                                </li>
                                <li className='list-group-item'>
                                    <b>Captain:</b>
                                    {handleBoolean(player.captain)}
                                </li>
                                <li className='list-group-item'>
                                    <b>Rookie:</b>
                                    {handleBoolean(player.rookie)}
                                </li>
                                <li className='list-group-item'>
                                    <b>ShootsCatches:</b>
                                    {player.shoots_catches}
                                </li>
                                <li className='list-group-item'>
                                    <b>RosterStatus:</b>
                                    {player.roster_status}
                                </li>
                                <li className='list-group-item'>
                                    <b>Team:</b>
                                    {player.current_team}
                                </li>
                                <li className='list-group-item'>
                                    <b>PrimaryPosition:</b>
                                    {player.primary_position}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className='btn btn-primary my-2' to='/'>Return Home</Link>
                </div>
            </div>
        </div>
    );
}
