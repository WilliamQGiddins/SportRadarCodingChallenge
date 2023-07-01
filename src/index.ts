import { initalizeDatabase } from "./lib/nhl_database";
import { ReadLiveNHLGame } from "./lib/read_live_nhl_data";
import { ScheduleDailyNhlGames } from "./lib/scheudle_nhl_games";
import { CronJob } from 'cron';


initalizeDatabase();

//First Process
//Schedule games runs on init and at midnight everyday 
//Parse output into object array of gameId and startTime
//Monitor for when a startTime is close and then call ReadLiveNHLGame with gameID

const scheduler = new ScheduleDailyNhlGames();
let todaysSchedule = scheduler.parseSchedule();
watchForGames();

const scheduleCron = new CronJob(
    '0 0 * * * * ', //Run every Midnight
    async () => {
        //Parse Schedule OutPut into object array
        todaysSchedule = scheduler.parseSchedule();
        watchForGames();
        console.log('Complete Schedule');
    },
    null,
    true,
);

//Constantly Check for games that will be 5 minutes from starting 
//Currently will stop at end of one day of games
function watchForGames () : void {
    while(todaysSchedule?.length) {
        let upcomingGame = todaysSchedule.find(game => new Date(game.startDateTime).getTime() - new Date().getTime() <= 300000);
        if(upcomingGame) {
            try {
                //Second Process
                const currentGame = new ReadLiveNHLGame(upcomingGame.gameId);
                currentGame.readPlayerInfo();
                currentGame.startReading();
                //As you read in gameData after every read in check gameData.datetime.endDateTime if its populated then call stop for that instance
                //currentGame.stopReading();
            } catch(e) {
                console.log(e);
            }
        }
    }
}

console.log('Hello world!')