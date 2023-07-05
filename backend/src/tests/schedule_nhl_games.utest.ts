import {expect} from "chai";
import * as sinon from "sinon";
import { GameSchedule } from "../model/nhl";
import { ScheduleDailyNhlGames } from "../lib/scheudle_nhl_games";
import * as testNhlGame from './mocks/nhl_game.json';

describe('schedule_nhl_games unit tests', () => {

    afterEach(()=> {
        sinon.restore();
    });
    
    const scheduler = new ScheduleDailyNhlGames();

    it('should return NHLGameSchedule array when successful', async () => {
        sinon.stub(scheduler, 'getDailySchedule').resolves(
            testNhlGame
        )

        const expectedResult = [{
            gameId: '2017020001',
            startDateTime: '2017-10-04T23:00:00Z',
            homeTeamId: 52,
            homeTeamName: 'Winnipeg Jets',
            awayTeamId: 10,
            awayTeamName: 'Toronto Maple Leafs',
            season: '20172018'
        }];

        const result = await scheduler.createSchedule();
        expect(result).eql(expectedResult);
    });

    it('should return empty NHLGameSchedule when no game scheduled or getDailySchedule throws a error', async () => {
       sinon.stub(scheduler, 'getDailySchedule').resolves(
            []
        )

        const expectedResult : GameSchedule[] = [];

        const result = await scheduler.createSchedule();
        expect(result).eql(expectedResult);
    });
});