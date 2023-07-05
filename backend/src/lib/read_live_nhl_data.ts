import { CronJob } from 'cron';
import axios from 'axios';
import { GameSchedule, NHLPlayerInfo, NHLPlayerStats, NHLTeamStats } from "../model/nhl";
import { writePlayerInfo, writePlayerStats, writeTeamStats } from './nhl_database';
import { Database } from 'sqlite3';

export class ReadLiveNHLGame {
    private gameInfo : GameSchedule;
    private db : Database;

    private ingestGameData = new CronJob(
        '0/15 * * * * * ', //Run every 15 seconds
        async () : Promise<void> => {
            //Read NHL data from api
            const isGameOver = await this.readNhlGameData(this.gameInfo, this.db);

            //If game is over stop reading
             if(isGameOver) {
                 this.stopReadingGame();
             }
        },
        null,
        false,
    );
    
    constructor(gameInfo: GameSchedule, db:Database) {
        this.gameInfo = gameInfo;
        this.db = db;
    }

    async startReadingGame(): Promise<void> {
        console.log(`Game ${this.gameInfo.gameId} has begun`);
        this.ingestGameData.start();
    }
    
    private stopReadingGame():void{
        console.log(`Game ${this.gameInfo.gameId} has ended`);
        this.ingestGameData.stop();
    }

    //Reads player data at the start of the game 
    async readPlayerInfo(): Promise<void> {
        //Call read player info
        const apiUrl = `https://statsapi.web.nhl.com/api/v1/game/${this.gameInfo.gameId}/feed/live`;
        try {
            const response = await axios.get(apiUrl);
            const players = response.data?.gameData?.players;
            const playerInfo : NHLPlayerInfo [] = [];
            if(players) {
                for (const player in players ) {
                    playerInfo.push(players[player]);
                }
            }
            //Write player info to database
            writePlayerInfo(this.db, playerInfo);
        } catch (e) {
            console.log(e);
        }
    }

    async readNhlGameData(gameInfo: GameSchedule, db:Database) : Promise<boolean> {
        console.log(`Checking Updated Stats for Game: ${gameInfo.gameId}`);
        let isGameOver = false;
        const apiUrl = `https://statsapi.web.nhl.com/api/v1/game/${gameInfo.gameId}/feed/live`;
        try {
            const response = await axios.get(apiUrl);
            const awayTeam = response.data?.liveData?.boxscore?.teams?.away;
            const homeTeam = response.data?.liveData?.boxscore?.teams?.home;
            isGameOver = !!response.data?.gameData?.datetime?.endDateTime;
            const homePlayerStats : NHLPlayerStats [] = [];
            const awayPlayerStats : NHLPlayerStats [] = [];
            const teamStats : NHLTeamStats [] = [];
    
            if (awayTeam && homeTeam) {
                //Get player stats for both teams
                for (const player in awayTeam.players) {
                    awayPlayerStats.push(awayTeam.players[player]);
                }
                for (const player in homeTeam.players) {
                    homePlayerStats.push(homeTeam.players[player]);
                }
    
                //Get home and away team stats
                teamStats.push(homeTeam);
                teamStats.push(awayTeam);

            //Write updated stats to database
            writePlayerStats(db, homePlayerStats, gameInfo, 'home');
            writePlayerStats(db, awayPlayerStats, gameInfo, 'away');
            writeTeamStats(db, teamStats, gameInfo);
            }
        } catch (e) {
            console.log(e);
        }
        return isGameOver;
    }
}
