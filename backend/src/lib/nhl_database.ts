import { Database } from "sqlite3";
import * as fs from 'fs';
import { NHLPlayerInfo, NHLTeamStats , NHLPlayerStats, NHLGameInfo, GameSchedule } from "../model/nhl";
import { nhlPlayersInsert, nhlGameStatsInsert, nhlGameStatsUpdate, nhlPlayerStatsInsert, 
    nhlPlayerStatsUpdate,nhlTeamStatsInsert, nhlTeamStatsUpdate} from "./sql/sql_queries";


export function initalizeDatabase() : Database {
    //Open NHL database
    const db = new Database('db.nhl');

    db.exec(fs.readFileSync(__dirname + '/sql/create_nhl_player_stats_table.sql').toString());
    db.exec(fs.readFileSync(__dirname + '/sql/create_nhl_player_info_table.sql').toString());
    db.exec(fs.readFileSync(__dirname + '/sql/create_nhl_team_stats_table.sql').toString());
    db.exec(fs.readFileSync(__dirname + '/sql/create_nhl_games_table.sql').toString());

    return db;
 }

 export function writePlayerInfo(db:Database, players: NHLPlayerInfo []) : void
 {
    for (const player of players) {
        db.run(
            nhlPlayersInsert, 
            [player.id, player.fullName, player.link, player.firstName, player.lastName,
            player.primaryNumber, player.birthDate, player.currentAge, player.birthCity,
            player.birthStateProvince, player.birthCountry, player.nationality, player.height,
            player.weight, player.active, player.alternateCaptain, player.captain, player.rookie,
            player.shootsCatches, player.rosterStatus, player.currentTeam.name, player.primaryPosition.name],
            function(e) {
                if (e) {
                    return console.log(e.message)
                }
            });
    }
 }

 export function writePlayerStats(db:Database, players: NHLPlayerStats [], game: GameSchedule, team : string) : void
 {
    let playerTeam;
    let opponentTeam;
    if (team === 'home') {
        playerTeam = {
            teamName: game.homeTeamName,
            teamId: game.homeTeamId,
        } 
        opponentTeam = game.awayTeamName
    } else {
        opponentTeam = game.homeTeamName,
        playerTeam = {
            teamName: game.awayTeamName,
            teamId: game.awayTeamId,
        }
    }

    for (const player of players) {
        const person = player.person;
        const stats = player.stats?.skaterStats;
        if(!stats) {continue}; 
        db.run(
            nhlGameStatsInsert, 
            [`${person.id}_${game.gameId}`, person.id, game.gameId, person.fullName, playerTeam.teamId, playerTeam.teamName, player.jerseyNumber,
            player.position.name, stats.assists, stats.goals, stats.shots, stats.hits, stats.powerPlayGoals, stats.powerPlayAssists, stats.penaltyMinutes,
            stats.faceOffWins, stats.faceoffTaken, stats.takeaways, stats.giveaways, stats.shortHandedGoals, stats.blocked, stats.plusMinus, 
            opponentTeam],
            function(e) {
                if (e) {
                    return console.log(e.message)
                }
        });
        db.run(
            nhlGameStatsUpdate,
            [stats.assists, stats.goals, stats.shots, stats.hits, stats.powerPlayGoals, stats.powerPlayAssists,
            stats.penaltyMinutes, stats.faceOffWins, stats.faceoffTaken, stats.takeaways, stats.giveaways,
            stats.shortHandedGoals, stats.blocked, stats.plusMinus, `${person.id}_${game.gameId}`],
            function(e) {
                if (e) {
                    return console.log(e.message)
                }
        });
        db.run(
            nhlPlayerStatsInsert, 
            [`${person.id}_${game.season}`,person.id, stats.assists, stats.goals, stats.shots,
            stats.hits, stats.powerPlayGoals, stats.powerPlayAssists, stats.penaltyMinutes,
            stats.faceOffWins, stats.faceoffTaken, stats.takeaways, stats.giveaways,
            stats.shortHandedGoals, stats.blocked, stats.plusMinus],
            function(e) {
                if (e) {
                    return console.log(e.message)
                }
        });
        db.run(
            nhlPlayerStatsUpdate,
            [stats.assists, stats.goals, stats.shots, stats.hits, stats.powerPlayGoals, stats.powerPlayAssists,
            stats.penaltyMinutes, stats.faceOffWins, stats.faceoffTaken, stats.takeaways, stats.giveaways,
            stats.shortHandedGoals, stats.blocked, stats.plusMinus, `${person.id}_${game.season}`],
            function(e) {
                if (e) {
                    return console.log(e.message)
                }
        });
    }
 }

 export function writeTeamStats(db:Database, teams: NHLTeamStats [], game: GameSchedule) : void
 {
    for (const team of teams) {
        const teamInfo = team.team;
        const stats = team.teamStats.teamSkaterStats;
        const id = `${teamInfo.id}_${game.season}`;
        db.run(
            nhlTeamStatsInsert,
            [`${teamInfo.id}_${game.season}`,teamInfo.id, teamInfo.name, stats.goals, stats.pim,
            stats.shots, stats.powerPlayGoals, stats.powerPlayOpportunities, stats.blocked, stats.takeaways, 
            stats.giveaways, stats.hits],
            function(e) {
                if (e) {
                    return console.log(e.message)
                }
            });
        db.run(
            nhlTeamStatsUpdate,
            [stats.goals, stats.pim, stats.shots, stats.powerPlayGoals, stats.powerPlayOpportunities, stats.blocked,
            stats.takeaways, stats.giveaways, stats.hits, `${teamInfo.id}_${game.season}` ],
            function(e) {
                if (e) {
                    return console.log(e.message)
                }
            });
        }
 }

 export function readPlayerInfo(db:Database, playerId: string | undefined, callback:Function)
 {
    if(playerId) {
        db.all(
            'SELECT * FROM nhl_players WHERE id = ? ',
            [Number(playerId)],
            (err, res) => {
                if(err) {
                    console.log(err);
                }
                callback(res) 
            }
        );
    }
    return;
 }

 export function readPlayerStats(db:Database, playerId: string | undefined, season: string | undefined, callback:Function)
 {
    if(playerId && season) {
        db.all(
            'SELECT * FROM nhl_player_stats INNER JOIN nhl_players ON nhl_player_stats.id=nhl_players.id WHERE id_season = ? ',
            [`${playerId}_${season}`],
            (err, res) => {
                if(err) {
                    console.log(err);
                }
                console.log(res);
                callback(res) 
            }
        );
    }
    return;
 }

 export function readTeamStats(db:Database, teamId: string | undefined, season: string | undefined, callback:Function)
 {
    if(teamId && season) {
        db.all(
            'SELECT * FROM nhl_team_stats WHERE id_season = ? ',
            [`${teamId}_${season}`],
            (err, res) => {
                if(err) {
                    console.log(err);
                }
                callback(res) 
            }
        );
    }
    return;
 }

 export function readGameStats(db:Database, playerId: string | undefined, gameId: string | undefined, callback:Function)
 {
    if(playerId && gameId) {
        db.all(
            'SELECT * FROM nhl_games WHERE playerid_gameid = ? ',
            [`${playerId}_${gameId}`],
            (err, res) => {
                if(err) {
                    console.log(err);
                }
                callback(res) 
            }
        );
    } 
    return;
 }