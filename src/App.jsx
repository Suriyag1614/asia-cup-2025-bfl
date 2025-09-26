import React, { useState, useEffect, useRef } from 'react';
import { fetchAllSheets } from './dataHandler';
import './index.css';

const tabEmojiMap = {
  "LEADERBOARD": "🏆",
  "PLAYERS DATA": "👤",
  "NEWS": "🗞️",
  "TEAM PICK AND PREDICTIONS": "📋",
  "TARGET PREDICTIONS": "🎯",
  "WINNING TEAM PREDICTIONS": "🎲",
  "MATCH-WISE PERFORMANCE": "📊",
  "POINTS SYSTEM": "⚡",
  "DESCRIPTIVE PLAYER POINTS": "📝",
  "SELECTED PLAYER STATS": "⚔️"
};

const headerEmojiMap = {
  "RANK": "🥇",
  "NAME": "🙎",
  "TEAM": "🌏",
  "POINTS TALLY": "💯",
  "MATCHES PLAYED": "🎮",
  "POINTS SYSTEM": "⚡",
  "PROGRESS": "📈",
  "WICKET": "🥅",
  "BATTER": "🏏",
  "BOWLER": "⚾",
  "ALLROUNDER": "🌟",
  "FINISHER": "💪",
  "CAPTAIN": "🧢",
  "VICE-CAPTAIN": "🎩",
  "TOTAL CREDITS": "💰",
  "HEADLINES": "📰"
};

const SheetStructure = ({ data, activeSheetKey }) => {
  const [tableData, setTableData] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  useEffect(() => {
    setTableData(data || []);
  }, [data]);

  if (!tableData || tableData.length === 0) return <p className="no-data">No data in this sheet.</p>;

  const columns = Array.from(new Set(tableData.flatMap(row => Object.keys(row))));

  const handleSort = (col) => {
    let direction = 'asc';
    if (sortConfig.key === col && sortConfig.direction === 'asc') direction = 'desc';

    const sorted = [...tableData].sort((a, b) => {
      const valA = a[col] ?? '';
      const valB = b[col] ?? '';
      if (!isNaN(valA) && !isNaN(valB)) return direction === 'asc' ? valA - valB : valB - valA;
      return direction === 'asc' ? String(valA).localeCompare(String(valB)) : String(valB).localeCompare(String(valA));
    });
    setTableData(sorted);
    setSortConfig({ key: col, direction });
  };

  const getSortSymbol = (col) => sortConfig.key === col ? (sortConfig.direction === 'asc' ? ' ▲' : ' ▼') : '';

  return (
    <div className="table-container">
      <div className="table-wrapper">
        <div className="table-scroll">
          <table className="styled-table">
            <thead>
              <tr>
                {columns.map(col => (
                  <th key={col} onClick={() => handleSort(col)}>
                    {headerEmojiMap[col] ? `${headerEmojiMap[col]} ${col}` : col}
                    {getSortSymbol(col)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'even' : 'odd'}>
                  {columns.map(col => (
                    <td key={col} style={{ whiteSpace: 'nowrap' }}>{row[col] ?? ''}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [sheetsData, setSheetsData] = useState({});
  const [activeSheet, setActiveSheet] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAllSheets('/data.xlsx');
        setSheetsData(data);
        const sheetNames = Object.keys(data).filter(name => name !== "DESCRIPTIVE PLAYER POINTS");
        setActiveSheet(sheetNames[0] || '');
      } catch (err) {
        console.error(err);
        setError('Failed to load Excel file. Check file path or name.');
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <p className="loading">Loading Data... Please Wait!</p>;
  if (error) return <p className="error">{error}</p>;

  const sheetNames = Object.keys(sheetsData).filter(name => name !== "DESCRIPTIVE PLAYER POINTS");
  const currentData = sheetsData[activeSheet] || [];

  return (
    <div className="app-container">
      <h1 className="title">ASIA CUP 2025 - BFL DASHBOARD</h1>
      <p className="last-updated">📌 LAST UPDATED – MATCH NO. 17</p>
      <div className="tabs">
  {sheetNames.map(name => {
    const tabEmoji = tabEmojiMap[name] ? `${tabEmojiMap[name]} ` : ""; // 👈 check this line
    return (
      <button
        key={name}
        className={`tab-button ${name === activeSheet ? 'active' : ''}`}
        onClick={() => setActiveSheet(name)}
      >
        {tabEmoji}{name}   {/* 👈 this renders emoji + text */}
      </button>
    );
  })}
</div>
      <SheetStructure data={currentData} activeSheetKey={activeSheet} />
  <footer className="footer">
    <img src="/Logo - BFL.png" alt="BFL Logo" className="footer-logo" />
    <div className="footer-text">
      <p>COPYRIGHT ©️ 2025 BISHOPIANS FANTASY LEAGUE.</p>
      <p>ALL RIGHTS RESERVED.</p>
    </div>
  </footer>
    </div>
  );
}

export default App;
