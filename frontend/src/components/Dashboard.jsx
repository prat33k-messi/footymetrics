import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL } from '../api/config';

export default function Dashboard() {
  const navigate = useNavigate();
  const uname = localStorage.getItem('uname');
  const upsw = localStorage.getItem('upsw');
  
  const [userData, setUserData] = useState(null);
  const [stats, setStats] = useState({
    goals: 28,
    assists: 14,
    matches: 32,
    goalsPerMatch: 0.88,
    totalContributions: 42,
    performanceRating: 9.3
  });
  
  // Modals & Active Tab
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'scout' | 'matches'
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  
  // Form states
  const [editStatsForm, setEditStatsForm] = useState({ maths: 28, physics: 14, chemistry: 32 });
  const [matchForm, setMatchForm] = useState({
    opponent: '',
    goals: 1,
    assists: 1,
    result: 'WIN',
    matchDate: new Date().toISOString().split('T')[0],
    notes: ''
  });
  const [newPassword, setNewPassword] = useState('');
  const [updateMsg, setUpdateMsg] = useState('');
  
  // Match History & Leaderboard
  const [matches, setMatches] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [searchScout, setSearchScout] = useState('');
  const [filterRole, setFilterRole] = useState('ALL');

  useEffect(() => {
    if (!uname || !upsw) {
      navigate('/log');
      return;
    }
    
    // Load local cached user
    const cachedUser = localStorage.getItem('user');
    if (cachedUser) {
      try {
        setUserData(JSON.parse(cachedUser));
      } catch (e) {
        console.error(e);
      }
    }

    // Fetch Stats from Backend
    fetchPlayerStats();
    fetchMatches();
    fetchLeaderboard();
  }, [uname, upsw, navigate]);

  const fetchPlayerStats = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/stats/${uname}`);
      if (res.data) {
        setStats(res.data);
        setEditStatsForm({
          maths: res.data.goals,
          physics: res.data.assists,
          chemistry: res.data.matches
        });
      }
    } catch (err) {
      console.warn('Backend offline or stats empty; using active telemetry preview.');
    }
  };

  const fetchMatches = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/matches/${uname}`);
      if (res.data && res.data.length > 0) {
        setMatches(res.data);
      } else {
        // Sample default matches for initial showcase
        setMatches([
          { id: 1, opponent: 'Manchester City', goals: 2, assists: 1, result: 'WIN', matchDate: '2026-10-01', notes: 'Masterclass in transition' },
          { id: 2, opponent: 'Bayern Munich', goals: 1, assists: 0, result: 'DRAW', matchDate: '2026-09-24', notes: 'Late equalizer scored' },
          { id: 3, opponent: 'Real Madrid', goals: 0, assists: 2, result: 'WIN', matchDate: '2026-09-18', notes: 'Tactical playmaking' }
        ]);
      }
    } catch (err) {
      setMatches([
        { id: 1, opponent: 'Manchester City', goals: 2, assists: 1, result: 'WIN', matchDate: '2026-10-01', notes: 'Masterclass in transition' },
        { id: 2, opponent: 'Bayern Munich', goals: 1, assists: 0, result: 'DRAW', matchDate: '2026-09-24', notes: 'Late equalizer scored' },
        { id: 3, opponent: 'Real Madrid', goals: 0, assists: 2, result: 'WIN', matchDate: '2026-09-18', notes: 'Tactical playmaking' }
      ]);
    }
  };

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/leaderboard`);
      if (res.data && res.data.length > 0) {
        setLeaderboard(res.data);
      } else {
        setLeaderboard([
          { xyz: 1, username: uname || 'Messi', branch: userData?.branch || 'Inter Miami', role: 'Forward', goals: stats.goals, assists: stats.assists, matches: stats.matches, performanceRating: stats.performanceRating },
          { xyz: 2, username: 'Zidane', branch: 'Real Madrid Legend', role: 'Playmaker', goals: 18, assists: 26, matches: 30, performanceRating: 9.1 },
          { xyz: 3, username: 'Haaland', branch: 'Manchester City', role: 'Forward', goals: 34, assists: 6, matches: 31, performanceRating: 8.9 },
          { xyz: 4, username: 'De Bruyne', branch: 'Manchester City', role: 'Midfielder', goals: 12, assists: 29, matches: 28, performanceRating: 8.8 },
          { xyz: 5, username: 'Van Dijk', branch: 'Liverpool', role: 'Defender', goals: 4, assists: 3, matches: 33, performanceRating: 8.5 }
        ]);
      }
    } catch (err) {
      setLeaderboard([
        { xyz: 1, username: uname || 'Messi', branch: userData?.branch || 'Inter Miami', role: 'Forward', goals: stats.goals, assists: stats.assists, matches: stats.matches, performanceRating: stats.performanceRating },
        { xyz: 2, username: 'Zidane', branch: 'Real Madrid Legend', role: 'Playmaker', goals: 18, assists: 26, matches: 30, performanceRating: 9.1 },
        { xyz: 3, username: 'Haaland', branch: 'Manchester City', role: 'Forward', goals: 34, assists: 6, matches: 31, performanceRating: 8.9 },
        { xyz: 4, username: 'De Bruyne', branch: 'Manchester City', role: 'Midfielder', goals: 12, assists: 29, matches: 28, performanceRating: 8.8 }
      ]);
    }
  };

  const handleUpdateStats = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/marks/update`, {
        username: uname,
        maths: parseInt(editStatsForm.maths, 10),
        physics: parseInt(editStatsForm.physics, 10),
        chemistry: parseInt(editStatsForm.chemistry, 10)
      });
      if (res.data) {
        setStats(res.data);
      }
    } catch (err) {
      // Local reactive update
      const g = parseInt(editStatsForm.maths, 10);
      const a = parseInt(editStatsForm.physics, 10);
      const m = parseInt(editStatsForm.chemistry, 10);
      const gpm = m > 0 ? Math.round((g / m) * 100) / 100 : 0;
      let r = 6.0 + ((g * 1.5 + a * 1.0) / (m || 1)) * 2.0;
      if (r > 9.9) r = 9.9;
      setStats({
        ...stats,
        goals: g,
        assists: a,
        matches: m,
        goalsPerMatch: gpm,
        totalContributions: g + a,
        performanceRating: Math.round(r * 10) / 10
      });
    }
    setShowStatsModal(false);
  };

  const handleLogMatch = async (e) => {
    e.preventDefault();
    const newEntry = {
      username: uname,
      opponent: matchForm.opponent,
      goals: parseInt(matchForm.goals, 10),
      assists: parseInt(matchForm.assists, 10),
      result: matchForm.result,
      matchDate: matchForm.matchDate,
      notes: matchForm.notes
    };

    try {
      const res = await axios.post(`${API_BASE_URL}/matches/log`, newEntry);
      if (res.data) {
        setMatches([res.data, ...matches]);
      }
      fetchPlayerStats();
    } catch (err) {
      // Offline fallback state update
      const localLog = { ...newEntry, id: Date.now() };
      setMatches([localLog, ...matches]);
      setStats(prev => ({
        ...prev,
        goals: prev.goals + newEntry.goals,
        assists: prev.assists + newEntry.assists,
        matches: prev.matches + 1,
        totalContributions: prev.totalContributions + newEntry.goals + newEntry.assists
      }));
    }

    setShowMatchModal(false);
    setMatchForm({
      opponent: '',
      goals: 1,
      assists: 1,
      result: 'WIN',
      matchDate: new Date().toISOString().split('T')[0],
      notes: ''
    });
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_BASE_URL}/update`, {
        username: uname,
        password: upsw,
        npassword: newPassword
      });
      if (res.status === 200) {
        setUpdateMsg('Password updated successfully.');
        localStorage.setItem('upsw', newPassword);
        setTimeout(() => {
          setShowPasswordModal(false);
          setUpdateMsg('');
        }, 1500);
      }
    } catch (err) {
      setUpdateMsg('Password update failed. Verify current credentials.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('uname');
    localStorage.removeItem('upsw');
    localStorage.removeItem('user');
    navigate('/log');
  };

  const copyScoutCard = () => {
    const text = `FOOTYMETRICS SCOUT REPORT // ATHLETE: ${uname} | CLUB: ${userData?.branch || 'N/A'} | POS: ${userData?.role || 'Forward'} | RATING: ${stats.performanceRating}/10 | GOALS: ${stats.goals} | ASSISTS: ${stats.assists} | MATCHES: ${stats.matches} | GPM: ${stats.goalsPerMatch}`;
    navigator.clipboard.writeText(text);
    alert('Scouting report copied to clipboard!');
  };

  const filteredLeaderboard = leaderboard.filter(player => {
    const matchesSearch = player.username.toLowerCase().includes(searchScout.toLowerCase()) ||
                          player.branch.toLowerCase().includes(searchScout.toLowerCase());
    const matchesRole = filterRole === 'ALL' || player.role.toLowerCase() === filterRole.toLowerCase();
    return matchesSearch && matchesRole;
  });

  return (
    <div className="page-container" style={{ alignItems: 'flex-start' }}>
      <div className="dashboard-container">
        
        {/* Top Header & Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.25rem', marginBottom: '2rem' }}>
          <div>
            <span className="brand-badge" style={{ marginBottom: '0.4rem', display: 'inline-block' }}>
              ATHLETE TELEMETRY // ACTIVE
            </span>
            <h1 style={{ fontSize: '2.4rem', fontWeight: '700', lineHeight: '1.1' }}>
              {uname}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '0.35rem' }}>
              {userData?.branch || 'Club Undefined'} • {userData?.role || 'Forward'} • {userData?.email || `${uname}@club.com`}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
            <button className="btn-secondary" onClick={() => setShowMatchModal(true)}>
              + Log Match
            </button>
            <button className="btn-secondary" onClick={() => setShowStatsModal(true)}>
              ✎ Edit Stats
            </button>
            <button className="btn-secondary" onClick={copyScoutCard}>
              ⧉ Copy Scout Report
            </button>
            <button className="btn-danger" onClick={handleLogout}>
              Sign Out
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-subtle)', marginBottom: '1.75rem', paddingBottom: '0.5rem' }}>
          <button 
            className={`nav-link ${activeTab === 'overview' ? 'active-btn' : ''}`}
            onClick={() => setActiveTab('overview')}
            style={{ cursor: 'pointer' }}
          >
            01 // Analytics Overview
          </button>
          <button 
            className={`nav-link ${activeTab === 'matches' ? 'active-btn' : ''}`}
            onClick={() => setActiveTab('matches')}
            style={{ cursor: 'pointer' }}
          >
            02 // Match Log History ({matches.length})
          </button>
          <button 
            className={`nav-link ${activeTab === 'scout' ? 'active-btn' : ''}`}
            onClick={() => setActiveTab('scout')}
            style={{ cursor: 'pointer' }}
          >
            03 // Scouting Leaderboard
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <>
            {/* Key Metric Highlights */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-title">Impact Rating</div>
                <div className="stat-value mono-num">{stats.performanceRating}</div>
                <span className="stat-badge">Scale 0.0 - 10.0 // Elite</span>
              </div>

              <div className="stat-card">
                <div className="stat-title">Goals Scored (Maths)</div>
                <div className="stat-value mono-num">{stats.goals}</div>
                <span className="stat-badge">GPM: {stats.goalsPerMatch} Per Fixture</span>
              </div>

              <div className="stat-card">
                <div className="stat-title">Assists Provided (Physics)</div>
                <div className="stat-value mono-num">{stats.assists}</div>
                <span className="stat-badge">Key Playmaker Telemetry</span>
              </div>

              <div className="stat-card">
                <div className="stat-title">Appearances (Chemistry)</div>
                <div className="stat-value mono-num">{stats.matches}</div>
                <span className="stat-badge">Total Contributions: {stats.totalContributions} G+A</span>
              </div>
            </div>

            {/* Tactical Scout Preview Banner */}
            <div className="player-banner">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', position: 'relative', zIndex: 1 }}>
                <div>
                  <span className="brand-badge" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>
                    SCOUT INTELLIGENCE CARD
                  </span>
                  <h2 style={{ fontSize: '1.8rem', fontWeight: '700' }}>{uname}</h2>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginTop: '0.25rem' }}>
                    Registered under {userData?.branch || 'Pro Club'} as primary {userData?.role || 'Forward'}
                  </p>
                  
                  <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem' }}>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>EFFICIENCY</div>
                      <div className="mono-num" style={{ fontSize: '1.25rem', fontWeight: '700', color: '#fff' }}>
                        {stats.matches > 0 ? `${((stats.goals / stats.matches) * 100).toFixed(0)}%` : '0%'}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>G+A PER MATCH</div>
                      <div className="mono-num" style={{ fontSize: '1.25rem', fontWeight: '700', color: '#fff' }}>
                        {stats.matches > 0 ? ((stats.totalContributions / stats.matches).toFixed(2)) : '0.00'}
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase' }}>ROLE TACTICS</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: '700', color: '#fff' }}>
                        {userData?.role || 'Forward'}
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <button className="btn-secondary" onClick={() => setShowPasswordModal(true)}>
                    Security &amp; Password
                  </button>
                </div>
              </div>
            </div>
          </>
        )}

        {/* TAB 2: MATCH LOG HISTORY */}
        {activeTab === 'matches' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem' }}>Official Fixture Records</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Individual match outputs recorded in player log</p>
              </div>
              <button className="btn-primary" onClick={() => setShowMatchModal(true)} style={{ width: 'auto' }}>
                + Record New Fixture
              </button>
            </div>

            <div className="table-container">
              <table className="mono-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Opponent</th>
                    <th>Result</th>
                    <th>Goals</th>
                    <th>Assists</th>
                    <th>Tactical Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {matches.map((m) => (
                    <tr key={m.id}>
                      <td className="mono-num" style={{ color: 'var(--text-muted)' }}>{m.matchDate}</td>
                      <td style={{ fontWeight: '600' }}>{m.opponent}</td>
                      <td>
                        <span className={m.result === 'WIN' ? 'badge-win' : m.result === 'DRAW' ? 'badge-draw' : 'badge-loss'}>
                          {m.result}
                        </span>
                      </td>
                      <td className="mono-num">{m.goals}</td>
                      <td className="mono-num">{m.assists}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{m.notes || '—'}</td>
                    </tr>
                  ))}
                  {matches.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                        No fixtures logged yet. Click "+ Record New Fixture" above.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: SCOUTING LEADERBOARD */}
        {activeTab === 'scout' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem' }}>Global Squad Leaderboard</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Performance ratings ranked across clubs &amp; leagues</p>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <input
                  type="text"
                  className="form-input"
                  style={{ width: '220px' }}
                  placeholder="Search player or club..."
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
                    <th>Player</th>
                    <th>Club / Branch</th>
                    <th>Position</th>
                    <th>Goals</th>
                    <th>Assists</th>
                    <th>Matches</th>
                    <th>Impact Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeaderboard.map((p, idx) => (
                    <tr key={p.xyz || idx} style={p.username === uname ? { background: 'rgba(255, 255, 255, 0.05)' } : {}}>
                      <td className="mono-num" style={{ fontWeight: '700' }}>#{idx + 1}</td>
                      <td style={{ fontWeight: '700' }}>
                        {p.username} {p.username === uname && <span className="stat-badge" style={{ marginLeft: '0.4rem' }}>YOU</span>}
                      </td>
                      <td style={{ color: 'var(--text-secondary)' }}>{p.branch}</td>
                      <td>
                        <span className="stat-badge">{p.role}</span>
                      </td>
                      <td className="mono-num">{p.goals}</td>
                      <td className="mono-num">{p.assists}</td>
                      <td className="mono-num">{p.matches}</td>
                      <td className="mono-num" style={{ fontWeight: '700', color: '#fff' }}>
                        {p.performanceRating}
                      </td>
                    </tr>
                  ))}
                  {filteredLeaderboard.length === 0 && (
                    <tr>
                      <td colSpan="8" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>
                        No players matched your filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODAL: EDIT CAREER STATS */}
        {showStatsModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="modal-close" onClick={() => setShowStatsModal(false)}>✕</button>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.25rem' }}>Edit Career Telemetry</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                Update cumulative Goals, Assists, and Matches in your database record.
              </p>

              <form onSubmit={handleUpdateStats}>
                <div className="form-group">
                  <label className="form-label">Goals Scored (Maths)</label>
                  <input
                    type="number"
                    min="0"
                    className="form-input"
                    value={editStatsForm.maths}
                    onChange={(e) => setEditStatsForm({ ...editStatsForm, maths: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Assists Provided (Physics)</label>
                  <input
                    type="number"
                    min="0"
                    className="form-input"
                    value={editStatsForm.physics}
                    onChange={(e) => setEditStatsForm({ ...editStatsForm, physics: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Appearances / Matches (Chemistry)</label>
                  <input
                    type="number"
                    min="0"
                    className="form-input"
                    value={editStatsForm.chemistry}
                    onChange={(e) => setEditStatsForm({ ...editStatsForm, chemistry: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                  SAVE CAREER STATS →
                </button>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: LOG MATCH FIXTURE */}
        {showMatchModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="modal-close" onClick={() => setShowMatchModal(false)}>✕</button>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.25rem' }}>Record Fixture Telemetry</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                Log individual match results. Career stats will automatically increment.
              </p>

              <form onSubmit={handleLogMatch}>
                <div className="form-group">
                  <label className="form-label">Opposing Club</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Manchester City"
                    value={matchForm.opponent}
                    onChange={(e) => setMatchForm({ ...matchForm, opponent: e.target.value })}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Goals Scored</label>
                    <input
                      type="number"
                      min="0"
                      className="form-input"
                      value={matchForm.goals}
                      onChange={(e) => setMatchForm({ ...matchForm, goals: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Assists</label>
                    <input
                      type="number"
                      min="0"
                      className="form-input"
                      value={matchForm.assists}
                      onChange={(e) => setMatchForm({ ...matchForm, assists: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="form-group">
                    <label className="form-label">Result</label>
                    <select
                      className="form-select"
                      value={matchForm.result}
                      onChange={(e) => setMatchForm({ ...matchForm, result: e.target.value })}
                    >
                      <option value="WIN">WIN</option>
                      <option value="DRAW">DRAW</option>
                      <option value="LOSS">LOSS</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Fixture Date</label>
                    <input
                      type="date"
                      className="form-input"
                      value={matchForm.matchDate}
                      onChange={(e) => setMatchForm({ ...matchForm, matchDate: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Tactical Notes</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Key actions, free kicks, defensive press..."
                    value={matchForm.notes}
                    onChange={(e) => setMatchForm({ ...matchForm, notes: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                  SUBMIT FIXTURE →
                </button>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: SECURITY / UPDATE PASSWORD */}
        {showPasswordModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="modal-close" onClick={() => setShowPasswordModal(false)}>✕</button>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.25rem' }}>Security Credentials</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                Change your player account authentication password.
              </p>

              {updateMsg && (
                <div className="alert alert-success">
                  {updateMsg}
                </div>
              )}

              <form onSubmit={handlePasswordUpdate}>
                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>
                  UPDATE PASSWORD →
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
