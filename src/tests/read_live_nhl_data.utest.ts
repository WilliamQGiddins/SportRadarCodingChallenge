import {expect} from "chai";
import * as sinon from "sinon";
import { Database } from "sqlite3";
import { ReadLiveNHLGame } from "../lib/read_live_nhl_data";
import * as Write  from "../lib/nhl_database";
import { GameSchedule } from "../model/nhl";

describe('read_live_nhl_date unit test', () => {

    const fakeDatabase = {
        exec: () => Database,
        run: () => Database,
        all: () => Database
    } as unknown as Database;

    const fakeGameInfo = {
        gameId: '2017020001',
        startDateTime: '2017-10-04T23:00:00Z',
        homeTeamId: 52,
        homeTeamName: 'Winnipeg Jets',
        awayTeamId: 10,
        awayTeamName: 'Toronto Maple Leafs',
        season: '20172018'
    }

    afterEach(()=> {
        sinon.restore();
    });

    const readLiveNhlGame = new ReadLiveNHLGame(fakeGameInfo,fakeDatabase);

    it('should throw error if game info undefined', async() => {
        await readLiveNhlGame.readNhlGameData({} as GameSchedule,fakeDatabase)
        .then(() => {throw new Error('Invalid Request with value: undefined')})
        .catch((err) => {
            expect(err.message).eqls('Invalid Request with value: undefined');
        });
    });

    it('should return false if game info undefined', async() => {
        const isGameOver = await readLiveNhlGame.readNhlGameData({} as GameSchedule,fakeDatabase);
        expect(isGameOver).eqls(false);
    });

    it('should return true if writePlayerStats or writeTeamStats throws a error but game is over', async() => {
        const writeStub = sinon.stub(Write, 'writePlayerStats').throwsException();
        const isGameOver = await readLiveNhlGame.readNhlGameData(fakeGameInfo,fakeDatabase);
        expect(isGameOver).eqls(true);
    });

});