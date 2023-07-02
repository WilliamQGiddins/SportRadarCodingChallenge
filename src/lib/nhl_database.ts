import { Database } from "sqlite3";
import * as fs from 'fs';

export interface nhl_player {
    player_id: string;
    player_name: string;
}

export interface nhl_team {
    team_id: string;
}

export interface nhl_game {
    game_id: string;
}


export function  initalizeDatabase() : void {
    //Open NHL database
    const db = new Database('db.nhl');

    db.exec(fs.readFileSync(__dirname + '/sql/create_nhl_game_table.sql').toString());
    db.exec(fs.readFileSync(__dirname + '/sql/create_nhl_player_table.sql').toString());
    db.exec(fs.readFileSync(__dirname + '/sql/create_nhl_team_table.sql').toString());

    /*
    db.exec(fs.readFileSync(__dirname + '/sql/insert.sql').toString());

    db.all(
        'SELECT title FROM nhl_teams ORDER BY LENGTH(description) DESC LIMIT 2',
        (_, res) => console.log(res)
      );
      */
 }

 export function writePlayer(db:Database, player: nhl_player) : void
 {
    db.exec(fs.readFileSync(__dirname + '/sql/insert.sql').toString());
 }

 export function writeTeam(db:Database, team: nhl_team) : void
 {
    db.exec(fs.readFileSync(__dirname + '/sql/insert.sql').toString());
 }

 export function writeGame(db:Database, game: nhl_game) : void
 {
    db.exec(fs.readFileSync(__dirname + '/sql/insert.sql').toString());
 }

 //To DO: Add Read Functions