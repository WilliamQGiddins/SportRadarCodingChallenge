'use strict'

import axios from 'axios';
import { NHLGameInfo , GameSchedule } from "../model/nhl";

export class ScheduleDailyNhlGames {
    async getDailySchedule () : Promise<NHLGameInfo []> {
        const date = new Date();
        const dateParameter = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        const apiUrl = `https://statsapi.web.nhl.com/api/v1/schedule?date=${dateParameter}`;
        let gameSchedule: NHLGameInfo [] = [];

        //Make Schedule API call for todays games
        try {
            //const response = await axios.get(apiUrl);
            // TO DO: Testing
            const response = await axios.get('https://statsapi.web.nhl.com/api/v1/schedule?date=2017-10-04');

            if (response.data.dates?.length) {
                gameSchedule = response.data.dates[0].games;
            } 
        } catch (e) {
            console.log(e);
        }
        return gameSchedule;
    }

    async createSchedule(): Promise<GameSchedule []> {
        const games = await this.getDailySchedule();

        //Parse Json Object into Array of GameSchedules
        const gameSchedule : GameSchedule [] = [];
        if(games?.length) {
            for (const game of games) {
                gameSchedule.push( {
                    gameId : game.gamePk,
                    startDateTime: game.gameDate,
                    homeTeamId: game.teams.home.team.id,
                    homeTeamName: game.teams.home.team.name,
                    awayTeamId: game.teams.away.team.id,
                    awayTeamName: game.teams.away.team.name,
                    season: game.season
                });
            }
        }
        return gameSchedule;
    }
}