// import {expect} from "chai";
// import * as sinon from "sinon";
// import { Database } from "sqlite3";
// import { GameSchedule } from "../src/model/nhl";
// import { initializeNhlStatsApp } from "../src/initalize_nhl_app";

// describe('initialize_nhl_app unit tests', () => {

//     const fakeDatabase = {
//         exec: () => Database,
//         run: () => Database,
//         all: () => Database
//     } as unknown as Database;

//     const noGames : GameSchedule [] = [];
//     const games: GameSchedule [] = [{
//         gameId : '00000',
//         startDateTime: new Date().toString(),
//         homeTeamId: 1,
//         homeTeamName: 'home',
//         awayTeamId: 2,
//         awayTeamName: 'away',
//         season: '20222023'
//     }]

//     beforeEach(() => {
//         sinon.stub(Database, 'EventEmitter').value(fakeDatabase);
//     });

//     afterEach(() => {
//         sinon.restore();
//     });

//     it('no upcoming game should be found',  async () => {
//         initializeNhlStatsApp(fakeDatabase);
        
//     })

// });

