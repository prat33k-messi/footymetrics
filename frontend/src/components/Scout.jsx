import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../api/config';

export default function Scout() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [searchScout, setSearchScout] = useState('');
  const [filterRole, setFilterRole] = useState('ALL');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/leaderboard`);
        if (res.data && res.data.length > 0) {
          setLeaderboard(res.data);
        } else {
          setLeaderboard(getDefaultSquad());
        }
      } catch (err) {
        setLeaderboard(getDefaultSquad());
      }
    };
    fetchLeaderboard();
  }, []);

  const getDefaultSquad = () => [
    { xyz: 1, username: 'Messi', branch: 'Inter Miami', role: 'Forward', goals: 28, assists: 14, matches: 32, performanceRating: 9.3 },
    { xyz: 2, username: 'Zidane', branch: 'Real Madrid Legend', role: 'Playmaker', goals: 18, assists: 26, matches: 30, performanceRating: 9.1 },
    { xyz: 3, username: 'Haaland', branch: 'Manchester City', role: 'Forward', goals: 34, assists: 6, matches: 31, performanceRating: 8.9 },
    { xyz: 4, username: 'De Bruyne', branch: 'Manchester City', role: 'Midfielder', goals: 12, assists: 29, matches: 28, performanceRating: 8.8 },
    { xyz: 5, username: 'Van Dijk', branch: 'Liverpool', role: 'Defender', goals: 4, assists: 3, matches: 33, performanceRating: 8.5 }
  ];

  const filtered = leaderboard.filter(player => {
    const matchesSearch = player.username.toLowerCase().includes(searchScout.toLowerCase()) ||
                          player.branch.toLowerCase().includes(searchScout.toLowerCase());
    const matchesRole = filterRole === 'ALL' || player.role.toLowerCase() === filterRole.toLowerCase();
    return matchesSearch && matchesRole;
  });

  return (
    <div className="page-container" style={{ alignItems: 'flex-start' }}>
      <div className="dashboard-container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
          <div>
            <span className="brand-badge" style={{ marginBottom: '0.4rem', display: 'inline-block' }}>
              GLOBAL DATABASE // TALENT DIRECTORY
            </span>
            <h1 style={{ fontSize: '2.2rem', fontWeight: '700' }}>Scouting Directory</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '0.25rem' }}>
              Verified player analytics and tactical metrics across clubs
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <input
              type="text"
              className="form-input"
              style={{ width: '220px' }}
              placeholder="Filter by name or club..."
              value={searchScout}
              onChange={(e) => setSearchScout(e.target.value)}
            />
            <select
              className="form-select"
              style={{ width: '150px' }}
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
            >
              <option value="ALL">All Positions</option>
              <option value="Forward">Forwards</option>
              <option value="Playmaker">Playmakers</option>
              <option value="Midfielder">Midfielders</option>
              <option value="Defender">Defenders</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="mono-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Athlete</th>
                <th>Club / League</th>
                <th>Role</th>
                <th>Goals</th>
                <th>Assists</th>
                <th>Matches</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p, idx) => (
                <tr key={p.xyz || idx}>
                  <td className="mono-num" style={{ fontWeight: '700' }}>#{idx + 1}</td>
                  <td style={{ fontWeight: '700' }}>{p.username}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{p.branch}</td>
                  <td><span className="stat-badge">{p.role}</span></td>
                  <td className="mono-num">{p.goals}</td>
                  <td className="mono-num">{p.assists}</td>
                  <td className="mono-num">{p.matches}</td>
                  <td className="mono-num" style={{ fontWeight: '700', color: '#fff' }}>{p.performanceRating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1rem' }}>
            Want to register your player telemetry and join the global leaderboard?
          </p>
          <Link to="/reg" style={{ textDecoration: 'none' }}>
            <button className="btn-primary" style={{ width: 'auto', padding: '0.8rem 2rem' }}>
              REGISTER ATHLETE PROFILE →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
