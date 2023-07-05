
export const nhlPlayersInsert  =             
`INSERT OR REPLACE INTO nhl_players (
    id,
    full_name,
    link,
    first_name,
    last_name,
    primary_number,
    birth_date,
    current_age,
    birth_city,
    birth_state_province,
    birth_country,
    nationality,
    height,
    player_weight,
    active,
    alternate_captain,
    captain,
    rookie,
    shoots_catches,
    roster_status,
    current_team,
    primary_position
) VALUES(
    ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?  
)`;

export const nhlGameStatsInsert =
`INSERT OR IGNORE INTO nhl_games (
    playerid_gameid,
    player_id,
    game_id,
    full_name,
    team_id,
    team_name,
    primary_number,
    primary_position,
    assists,
    goals,
    shots,
    hits,
    power_play_goals,
    power_play_assists,
    penalty_minutes,
    face_off_wins,
    face_off_taken,
    takeaways,
    giveaways,
    short_handed_goals,
    blocked,
    plus_minus,
    opponent_team
) VALUES(
    ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
)`;

export const nhlGameStatsUpdate =
`UPDATE nhl_games SET
assists = (? - assists) + assists, 
goals = (? - goals) + goals,
shots = (? - shots) + shots,
hits = (? - hits) + hits,
power_play_goals = (? - power_play_goals) + power_play_goals,
power_play_assists = (? - power_play_assists) + power_play_assists,
penalty_minutes = (? - penalty_minutes) + penalty_minutes,
face_off_wins = (? - face_off_wins) + face_off_wins,
face_off_taken = (? - face_off_taken) + face_off_taken,
takeaways = (? - takeaways) + takeaways,
giveaways = (? - giveaways) + giveaways,
short_handed_goals = (? - short_handed_goals) + short_handed_goals,
blocked = (? - blocked) + blocked,
plus_minus = (? - plus_minus) + plus_minus
WHERE player_id = ?`;

export const nhlPlayerStatsInsert =
`INSERT OR IGNORE INTO nhl_player_stats (
    id_season,
    id,
    assists,
    goals,
    shots,
    hits,
    power_play_goals,
    power_play_assists,
    penalty_minutes,
    face_off_wins,
    face_off_taken,
    takeaways,
    giveaways,
    short_handed_goals,
    blocked,
    plus_minus
) VALUES(
    ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,? 
)`;

export const nhlPlayerStatsUpdate =
`UPDATE nhl_player_stats SET
assists = (? - assists) + assists, 
goals = (? - goals) + goals,
shots = (? - shots) + shots,
hits = (? - hits) + hits,
power_play_goals = (? - power_play_goals) + power_play_goals,
power_play_assists = (? - power_play_assists) + power_play_assists,
penalty_minutes = (? - penalty_minutes) + penalty_minutes,
face_off_wins = (? - face_off_wins) + face_off_wins,
face_off_taken = (? - face_off_taken) + face_off_taken,
takeaways = (? - takeaways) + takeaways,
giveaways = (? - giveaways) + giveaways,
short_handed_goals = (? - short_handed_goals) + short_handed_goals,
blocked = (? - blocked) + blocked,
plus_minus = (? - plus_minus) + plus_minus
WHERE id_season = ?`;

export const nhlTeamStatsInsert = 
`INSERT OR IGNORE INTO nhl_team_stats (
    id_season,
    id,
    team_name,
    goals,
    pim,
    shots,
    power_play_goals,
    power_play_opportunities,
    blocked,
    takeaways,
    giveaways,
    hits
) VALUES(
    ?,?,?,?,?,?,?,?,?,?,?,?
)`;

export const nhlTeamStatsUpdate =
`UPDATE nhl_team_stats SET 
goals = (? - goals) + goals,
pim = (? - pim) + pim,
shots = (? - shots) + shots,
power_play_goals = (? - power_play_goals) + power_play_goals,
power_play_opportunities = (? - power_play_opportunities) + power_play_opportunities,
blocked = (? - blocked) + blocked,
takeaways = (? - takeaways) + takeaways,
giveaways = (? - giveaways) + giveaways,
hits = (? - hits) + hits
WHERE id_season = ?`;
