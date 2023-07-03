CREATE TABLE IF NOT EXISTS nhl_player_stats (
    id_season VARCHAR(40) NOT NULL PRIMARY KEY,
    id INTEGER NOT NULL,
    assists INTEGER DEFAULT 0,
    goals INTEGER DEFAULT 0,
    shots INTEGER DEFAULT 0,
    hits INTEGER DEFAULT 0,
    power_play_goals INTEGER DEFAULT 0,
    power_play_assists INTEGER DEFAULT 0,
    penalty_minutes INTEGER DEFAULT 0,
    face_off_wins INTEGER DEFAULT 0,
    face_off_taken INTEGER DEFAULT 0,
    takeaways INTEGER DEFAULT 0,
    giveaways INTEGER DEFAULT 0,
    short_handed_goals INTEGER DEFAULT 0,
    blocked INTEGER DEFAULT 0,
    plus_minus INTEGER DEFAULT 0,
    FOREIGN KEY(id) REFERENCES nhl_players (id)
)