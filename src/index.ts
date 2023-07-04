import { Request, Response } from "express";
import express = require("express");
import { initializeNhlStatsApp } from "./initalize_nhl_app";
import { initalizeDatabase } from "./lib/nhl_database";
import { readPlayerInfo, readPlayerStats, readTeamStats, readGameStats } from "./lib/nhl_database";

const app = express();
const port = 3000; // default port to listen
const db = initalizeDatabase();
initializeNhlStatsApp(db).catch(e => {console.log(e)});

// define a route handler for the default home page
app.get( "/", ( req: Request, res:Response ) => {
    res.send( "Hello world!" );
} );

// /api/v1/player?playerId=8474709
app.get( "/api/v1/player", ( req: Request, res:Response ) => {
    readPlayerInfo(db, req.query.playerId?.toString(), 
    (rows:unknown[]) => {res.send(`PlayerInfo ${JSON.stringify(rows, null,2)}`)
    });
});

// /api/v1/player/stats?playerId=100002&season=20172018
app.get( "/api/v1/player/stats", ( req: Request, res:Response ) => {
    readPlayerStats(db, req.query.playerId?.toString(), req.query.season?.toString(),
    (rows:unknown[]) => {res.send(`PlayerStats for ${req.query.season?.toString()} ${JSON.stringify(rows, null,2)}`)
    });
});

// /api/v1/team?teamId=10&season=20172018
app.get( "/api/v1/team", ( req: Request, res:Response ) => {
    readTeamStats(db, req.query.teamId?.toString(), req.query.season?.toString(),
    (rows:unknown[]) => {res.send(`TeamStats for ${req.query.season?.toString()} ${JSON.stringify(rows, null,2)}`)
    });
});

// /api/v1/game?gameId=2017000012&playerId=8474709
app.get( "/api/v1/game", ( req: Request, res:Response ) => {
    readGameStats(db, req.query.playerId?.toString(), req.query.gameId?.toString(),
    (rows:unknown[]) => {res.send(`GameStats for ${req.query.gameId?.toString()} ${JSON.stringify(rows, null,2)}`)
    });
});

// Start the Express server
app.listen( port, () => {
    console.log( `App started at http://localhost:${ port }` );
} );