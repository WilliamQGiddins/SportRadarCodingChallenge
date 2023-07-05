# WilliamGiddins SportRadar Advanced Challenge

# Project Summary

This is my NHL Stats application, developed in Node.js with Typescript. The project utilizes Cron jobs to schedule the various processes that need to run
at their designated times. The first process to scheulde NHL games is set to run every midnight and trigger the second process `watchForGames()` to begin so
it can trigger the job `readNhlGameData()` to monitor live games. Once all games on the schedule have started the `watchForGames()` cron stops. The database used is Sqlite and the server calls are handled via express. There is a also a react frontend implemented to easily query the database before, during and after games.

# Step to Run the APP

- `Backend`

  - Execute: `$ npm install`
  - Execute: `$ npm run build`
  - Execute: `$ npm run test`
  - Execute: `$ npm run start`

- `Frontend`
  - Execute: `$ npm install`
  - Execute: `$ npm start`

Once both are running and games have begun to be ingested you can query the database through various webpages by providing either a `playerId`, `season`, `teamId` or `gameId` where appropriate.

[NHL API Documentation Summary](documentation.md)
