import { Request, Response } from "express";
import express = require("express");
import cors = require("cors");
import { initializeNhlStatsApp } from "./lib/initalize_nhl_app";
import { initalizeDatabase } from "./lib/nhl_database";
import { readPlayerInfo, readPlayerStats, readTeamStats, readGameStats } from "./lib/nhl_database";

const app = express();
const port = 8080; // default port to listen
const db = initalizeDatabase();
initializeNhlStatsApp(db).catch(e => {console.log(e)});

app.use(cors());

// /api/v1/player?playerId=8474709
app.get( "/api/v1/player", ( req: Request, res:Response ) => {
    readPlayerInfo(db, req.query.playerId?.toString(), 
    (rows:unknown[]) => {res.send(JSON.stringify(rows, null,2))
    });
});

// /api/v1/player/stats?playerId=8474709&season=20172018
app.get( "/api/v1/player/stats", ( req: Request, res:Response ) => {
    readPlayerStats(db, req.query.playerId?.toString(), req.query.season?.toString(),
    (rows:unknown[]) => {res.send(JSON.stringify(rows, null,2))
    });
});

// /api/v1/team?teamId=10&season=20172018
app.get( "/api/v1/team", ( req: Request, res:Response ) => {
    readTeamStats(db, req.query.teamId?.toString(), req.query.season?.toString(),
    (rows:unknown[]) => {res.send(JSON.stringify(rows, null,2))
    });
});

// /api/v1/game?gameId=2017020001&playerId=8474709
app.get( "/api/v1/game", ( req: Request, res:Response ) => {
    readGameStats(db, req.query.playerId?.toString(), req.query.gameId?.toString(),
    (rows:unknown[]) => {res.send(JSON.stringify(rows, null,2))
    });
});

// Start the Express server
app.listen( port, () => {
    console.log( `App started at http://localhost:${ port }` );
} );