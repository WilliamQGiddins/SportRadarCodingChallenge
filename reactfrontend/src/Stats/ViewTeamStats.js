import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios';

export default function ViewTeamStats() {

    const [team, setTeamStats] = useState({
        id: '',
        team_name: '',
        goals: '',
        pim: '',
        shots: '',
        power_play_goals: '',
        power_play_opportunities: '',
        blocked: '',
        takeaways: '',
        giveaways: '',
        hits: ''
    });

    const { teamId, season } = useParams();

    useEffect(() => {
        loadPlayerStats();
    }, []);

    const loadPlayerStats = async () => {
        const result = await axios.get(`http://localhost:8080/api/v1/team?teamId=${teamId}&season=${season}`);
        if(result?.data[0]){
            setTeamStats(result.data[0]);
        }
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'>Team Stat Sheet</h2>
                    <div className='card'>
                        <div className='card-header'>
                            Team Stats:
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <b>TeamId:</b>
                                    {team.id}
                                </li>
                                <li className='list-group-item'>
                                    <b>Team:</b>
                                    {team.team_name}
                                </li>
                                <li className='list-group-item'>
                                    <b>Goals:</b>
                                    {team.goals}
                                </li>
                                <li className='list-group-item'>
                                    <b>Pim:</b>
                                    {team.pim}
                                </li>
                                <li className='list-group-item'>
                                    <b>Shots:</b>
                                    {team.shots}
                                </li>
                                <li className='list-group-item'>
                                    <b>PowerPlayGoals:</b>
                                    {team.power_play_goals}
                                </li>
                                <li className='list-group-item'>
                                    <b>PowerPlayOpportunities:</b>
                                    {team.power_play_opportunities}
                                </li>
                                <li className='list-group-item'>
                                    <b>Blocked:</b>
                                    {team.blocked}
                                </li>
                                <li className='list-group-item'>
                                    <b>Takeaways:</b>
                                    {team.takeaways}
                                </li>
                                <li className='list-group-item'>
                                    <b>Giveaways:</b>
                                    {team.giveaways}
                                </li>
                                <li className='list-group-item'>
                                    <b>Hits:</b>
                                    {team.hits}
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
