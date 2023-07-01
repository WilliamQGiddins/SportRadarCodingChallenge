import { CronJob } from 'cron';


const liveGameAPI : String = 'https://statsapi.web.nhl.com/api/v1/game/2017020001/feed/live'

export class ReadLiveNHLGame {
    private gameId:String;
    private ingestGameData = new CronJob(
        '0/15 * * * * * ', //Run every 15 seconds
        async () : Promise<void> => {
            //Read NHL Data from API
            let temp = this.gameId
            readNhlData();
            writeNhlData();
        },
        //OnComplete,
        null,
        false,
    );
    
    constructor(gameId:String) {
        this.gameId = gameId;
    }

    startReading():void {
        this.ingestGameData.start();
    }
    stopReading():void{
        this.ingestGameData.stop();
    }

    //Reads Player Data at the start of the game 
    readPlayerInfo(): void {

    }
}

function readNhlData() : void {
    //Read Stats From API
    //Create separate Library for player reads and team reads
    console.log('Read From API');
}

function writeNhlData() : void {
    //Write to database
    console.log('Wrote to database');
}
