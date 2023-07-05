import { Request, Response, NextFunction } from "express";
import express = require("express");
import cors = require("cors");
import { initializeNhlStatsApp } from "./lib/initalize_nhl_app";
import { initalizeDatabase } from "./lib/nhl_database";
import { readPlayerInfo, readPlayerStats, readTeamStats, readGameStats } from "./lib/nhl_database";

const app = express();
const port = 8080; //Default port to listen
const db = initalizeDatabase();
initializeNhlStatsApp(db).catch(e => {console.log(e)});

app.use(cors());

app.get( "/api/v1/player", ( req: Request, res:Response, next:NextFunction ) => {
    try {
        const playerId = req.query.playerId?.toString();
        readPlayerInfo(db, playerId, (rows:unknown[]) => {res.send(JSON.stringify(rows, null,2))});
    } catch (err:unknown) {
        console.error(err);
        next(err);
    }
});

app.get( "/api/v1/player/stats", ( req: Request, res:Response, next:NextFunction) => {
    try {
        const playerId = req.query.playerId?.toString();
        const season = req.query.season?.toString();
        readPlayerStats(db, playerId, season, (rows:unknown[]) => {res.send(JSON.stringify(rows, null,2))});
    } catch (err:unknown) {
        console.error(err);
        next(err);
    }
});


app.get( "/api/v1/team", ( req: Request, res:Response, next:NextFunction ) => {
    try {
        const teamId = req.query.teamId?.toString();
        const season = req.query.season?.toString();
        readTeamStats(db, teamId, season, (rows:unknown[]) => {res.send(JSON.stringify(rows, null,2))});
    } catch (err:unknown) {
        console.error(err);
        next(err);
    }
});

app.get( "/api/v1/game", ( req: Request, res:Response, next:NextFunction ) => {
    try {
        const playerId =  req.query.playerId?.toString();
        const gameId = req.query.gameId?.toString();
        readGameStats(db, playerId, gameId, (rows:unknown[]) => {res.send(JSON.stringify(rows, null,2))});
    } catch (err:unknown) {
        console.error(err);
        next(err);
    }
});

//Start the express server
app.listen( port, () => {
    console.log( `App started at http://localhost:${ port }` );
} );