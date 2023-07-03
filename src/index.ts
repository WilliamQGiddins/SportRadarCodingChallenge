'use strict'

import { initalizeDatabase } from "./lib/nhl_database";
import { ReadLiveNHLGame } from "./lib/read_live_nhl_data";
import { ScheduleDailyNhlGames } from "./lib/scheudle_nhl_games";
import { CronJob } from 'cron';
import { GameSchedule } from "./model/nhl";


async function initializeNhlStatsApp() {
    const db = initalizeDatabase();

    //First Process
    //Schedule games runs on init and at midnight everyday then Call watchForGames()
    const scheduler = new ScheduleDailyNhlGames();
    let todaysSchedule = await scheduler.createSchedule();
    watchForGames(todaysSchedule);


    const scheduleCron = new CronJob(
        '0 0 * * * ', //Run every Midnight
        async () => {
            todaysSchedule = await scheduler.createSchedule();
            console.log(`Schedule for ${new Date} complete`);
            watchForGames(todaysSchedule);
        },
        null,
        true,
    );

    //Continuosuly check for games that will be 5 minutes from starting 
    async function watchForGames (currentSchedule: GameSchedule[]) : Promise<void> {
        
        const gameWatchCron = new CronJob(
            '* * * * *',  //Run every minute
            async () => {
                //let upcomingGame = currentSchedule.find(game => Math.abs(new Date(game.startDateTime).getTime() - new Date().getTime()) <= 300000);
                
                //TESTING
                let upcomingGame = currentSchedule.find(game => new Date(game.startDateTime).getTime() - new Date().getTime() <= 300000);

                console.log('Upcoming Game ' + JSON.stringify(upcomingGame, null, 2));
                if(upcomingGame) {
                    try {
                        const currentGame = new ReadLiveNHLGame(upcomingGame, db);
                        currentGame.readPlayerInfo();
                        currentGame.startReadingGame();

                        //Remove Current Game from schedule
                        currentSchedule = currentSchedule.filter(game => game !== upcomingGame);

                        if(!currentSchedule?.length) {
                            console.log(`Stopping game watch feed for ${new Date}`);
                            gameWatchCron.stop();
                        }
                    } catch(e) {
                        console.log(e);
                    }
                }
            },
            null,
            false
        );
        
        console.log(`Starting game watch feed for ${new Date}`);
        gameWatchCron.start();
    }
}

initializeNhlStatsApp();