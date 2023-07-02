export interface NHLGameInfo {
    gamePk: string,
    link: string,
    gameType: string,
    season: string,
    gameDate: string,
    status: {
        abstractGameState: string,
        codedGameState: string,
        detailedState: string,
        statusCode: string,
        startTimeTBD: boolean
    },
    teams: {
        away: {
            leagueRecord: {
                wins: number,
                losses: number,
                ot: number,
                type: string
            },
            score: number,
            team: {
                id: number,
                name: string,
                link: string
            }
        },
        home: {
            leagueRecord: {
                wins: number,
                losses: number,
                ot: number,
                type: string
            },
            score: 2,
            team: {
                id: number,
                name: string,
                link: string
            }
        }
    },
    venue: {
        name: string,
        link: string
    },
    content: {
        link: string
    }
}

export interface NHLGameStats {

}

export interface NHLPlayerStats {

}

export interface NHLTeamStats {

}

export interface GameSchedule {
    gameId: string,
    startDateTime: string
}