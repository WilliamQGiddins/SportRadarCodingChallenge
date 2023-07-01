interface GameSchedule {
    gameId: string,
    startDateTime: string
}

export class ScheduleDailyNhlGames {

    getDailySchedule () : String {
        //Make Schedule API call for todays gaames
        //https://statsapi.web.nhl.com/api/v1/schedule?date=2017-10-04
        //Return Json object to parse
        return 'Json Object to be parsed'
    }

    parseSchedule(): GameSchedule[] {
        this.getDailySchedule()
        //Parse Json Object into Array of GameSchedules
        return [];
    }

}