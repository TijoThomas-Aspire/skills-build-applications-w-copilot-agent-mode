import './App.css';
import { Link, Routes, Route } from 'react-router-dom';
import Activities from './components/Activities';
import Users from './components/Users';
import Teams from './components/Teams';
import Workouts from './components/Workouts';
import Leaderboard from './components/Leaderboard';
import { API_BASE } from './api';

function App() {
  console.log('[App] API_BASE =', API_BASE);
  return (
    <div className="container mt-3">
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
        <a className="navbar-brand" href="/">OctoFit Tracker</a>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item"><Link className="nav-link" to="/activities">Activities</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/users">Users</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/teams">Teams</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/workouts">Workouts</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/leaderboard">Leaderboard</Link></li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<div><h1>Welcome to OctoFit Tracker</h1></div>} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/workouts" element={<Workouts />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </div>
  );
}

export default App;
