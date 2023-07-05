import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Home from './pages/Home';
import PlayerInfo from './pages/PlayerInfo';
import TeamStats from './pages/TeamStats';
import GameStats from './pages/GameStats';
import PlayerStats from './pages/PlayerStats';
import ViewPlayerInfo from './Stats/ViewPlayerInfo';
import ViewPlayerStats from './Stats/ViewPlayerStats';
import ViewTeamStats from './Stats/ViewTeamStats';
import ViewGameStats from './Stats/ViewGameStats';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/playerinfo" element={<PlayerInfo/>} />
          <Route exact path="/teamstats" element={<TeamStats/>} />
          <Route exact path="/playerstats" element={<PlayerStats/>} />
          <Route exact path="/gamestats" element={<GameStats/>} />
          <Route exact path="/viewplayerinfo/:playerId" element={<ViewPlayerInfo />} />
          <Route exact path="/viewplayerstats/:playerId/:season" element={<ViewPlayerStats />} />
          <Route exact path="/viewteamstats/:teamId/:season" element={<ViewTeamStats />} />
          <Route exact path="/viewgamestats/:gameId/:playerId" element={<ViewGameStats />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
