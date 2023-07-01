CREATE TABLE IF NOT EXISTS nhl_players (
    season Integer NOT NULL PRIMARY KEY,
    player_id INTEGER NOT NULL,
    player_name VARCHAR(40) NOT NULL,
    team_id INTEGER NOT NULL,
    team_name VARCHAR(40) NOT NULL,
    player_age INTEGER NOT NULL,
    player_number Integer NOT NULL,
    player_position VARCHAR(40) NOT NULL,
    assists INTEGER NOT NULL,
    goals INTEGER NOT NULL,
    hits INTEGER NOT NULL,
    points INTEGER NOT NULL,
    penalty_minutes INTEGER NOT NULL,
    opponent_team VARCHAR(40) NOT NULL
)