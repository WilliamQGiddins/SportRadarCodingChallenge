import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios';

export default function ViewGameStats() {

    const [player, setGameStats] = useState({
        player_id: '',
        game_id: '',
        full_name: '',
        team_name: '',
        opponent_team: '',
        primary_number: '',
        primary_position: '',
        assists: '',
        goals: '',
        shots: '',
        hits: '',
        power_play_goals: '',
        power_play_assists: '',
        penalty_minutes: '',
        face_off_wins: '',
        face_off_taken: '',
        takeaways: '',
        giveaways: '',
        short_handed_goals: '',
        blocked: '',
        plus_minus: ''
    });

    const { gameId, playerId } = useParams();

    useEffect(() => {
        loadGameStats();
    }, []);

    const loadGameStats = async () => {
        const result = await axios.get(`http://localhost:8080/api/v1/game?gameId=${gameId}&playerId=${playerId}`);
        if(result?.data[0]){
            setGameStats(result?.data[0]);
            console.log(result?.data[0])
        }
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Game Stat Sheet</h2>
                    <div className='card'>
                        <div className='card-header'>
                            Player Stats:
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <b>PlayerId:</b>
                                    {player.player_id}
                                </li>
                                <li className='list-group-item'>
                                    <b>GameI:</b>
                                    {player.game_id}
                                </li>
                                <li className='list-group-item'>
                                    <b>FullName:</b>
                                    {player.full_name}
                                </li>
                                <li className='list-group-item'>
                                    <b>Team:</b>
                                    {player.team_name}
                                </li>
                                <li className='list-group-item'>
                                    <b>Opponent:</b>
                                    {player.opponent_team}
                                </li>
                                <li className='list-group-item'>
                                    <b>PrimaryNumber:</b>
                                    {player.primary_number}
                                </li>
                                <li className='list-group-item'>
                                    <b>PrimaryPosition:</b>
                                    {player.primary_position}
                                </li>
                                <li className='list-group-item'>
                                    <b>Assists:</b>
                                    {player.assists}
                                </li>
                                <li className='list-group-item'>
                                    <b>Goals:</b>
                                    {player.goals}
                                </li>
                                <li className='list-group-item'>
                                    <b>Shots:</b>
                                    {player.shots}
                                </li>
                                <li className='list-group-item'>
                                    <b>Hits:</b>
                                    {player.hits}
                                </li>
                                <li className='list-group-item'>
                                    <b>PowerPlayGoals:</b>
                                    {player.power_play_goals}
                                </li>
                                <li className='list-group-item'>
                                    <b>PowerPlayAssists:</b>
                                    {player.power_play_assists}
                                </li>
                                <li className='list-group-item'>
                                    <b>PenaltyMinutes:</b>
                                    {player.penalty_minutes}
                                </li>
                                <li className='list-group-item'>
                                    <b>FaceOffWins:</b>
                                    {player.face_off_wins}
                                </li>
                                <li className='list-group-item'>
                                    <b>FaceOffTaken:</b>
                                    {player.face_off_taken}
                                </li>
                                <li className='list-group-item'>
                                    <b>Takeaways:</b>
                                    {player.takeaways}
                                </li>
                                <li className='list-group-item'>
                                    <b>Giveaways:</b>
                                    {player.giveaways}
                                </li>
                                <li className='list-group-item'>
                                    <b>ShortHandedGoals:</b>
                                    {player.short_handed_goals}
                                </li>
                                <li className='list-group-item'>
                                    <b>Blocked:</b>
                                    {player.blocked}
                                </li>
                                <li className='list-group-item'>
                                    <b>PlusMinus:</b>
                                    {player.plus_minus}
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
