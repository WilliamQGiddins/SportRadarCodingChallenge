CREATE TABLE IF NOT EXISTS nhl_team_stats (
    id_season VARCHAR(40) NOT NULL PRIMARY KEY,
    id INTEGER NOT NULL,
    team_name VARCHAR(40),
    goals INTEGER DEFAULT 0,
    pim INTEGER DEFAULT 0,
    shots INTEGER DEFAULT 0,
    power_play_goals INTEGER DEFAULT 0,
    power_play_opportunities INTEGER DEFAULT 0,
    blocked INTEGER DEFAULT 0,
    takeaways INTEGER DEFAULT 0,
    giveaways INTEGER DEFAULT 0,
    hits INTEGER DEFAULT 0
)