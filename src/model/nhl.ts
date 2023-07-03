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
            score: number,
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

export interface NHLPlayerStats {
    person: {
        id: number,
        fullName: string,
        link: string,
        shootsCatches: string,
        rosterStatus: string
    },
    jerseyNumber: string,
    position: {
        code: string,
        name: string,
        type: string,
        abbreviation: string
    },
    stats: {
        skaterStats: {
            timeOnIce: string,
            assists: number,
            goals: number,
            shots: number,
            hits: number,
            powerPlayGoals: number,
            powerPlayAssists: number,
            penaltyMinutes: number,
            faceOffWins: number,
            faceoffTaken: number,
            takeaways: number,
            giveaways: number,
            shortHandedGoals: number,
            shortHandedAssists: number,
            blocked: number,
            plusMinus: number,
            evenTimeOnIce: string,
            powerPlayTimeOnIce: string,
            shortHandedTimeOnIce: string
        }
    }
}

export interface NHLPlayerInfo { 
    id: number,
    fullName: string,
    link: string,
    firstName: string,
    lastName: string,
    primaryNumber: string,
    birthDate: string,
    currentAge: number,
    birthCity: string,
    birthStateProvince: string,
    birthCountry: string,
    nationality: string,
    height: string,
    weight: number,
    active: boolean,
    alternateCaptain: boolean,
    captain: boolean,
    rookie: boolean,
    shootsCatches: string,
    rosterStatus: string,
    currentTeam: {
        id: number,
        name: string,
        link: string,
        triCode: string
    },
    primaryPosition: {
        code: string,
        name: string,
        type: string,
        abbreviation: string
    }
}

export interface NHLTeamStats {
    team: {
        id: number,
        name: string,
        link: string,
        abbreviation: string,
        triCode: string
    },
    teamStats: {
        teamSkaterStats: {
            goals: number,
            pim: number,
            shots: number,
            powerPlayPercentage: string,
            powerPlayGoals: number,
            powerPlayOpportunities: number,
            faceOffWinPercentage: string,
            blocked: number,
            takeaways: number,
            giveaways: number,
            hits: number
        }
    }
}

export interface GameSchedule {
    gameId: string,
    startDateTime: string,
    homeTeamId: number,
    homeTeamName: string,
    awayTeamId: number,
    awayTeamName: string,
    season: string
}