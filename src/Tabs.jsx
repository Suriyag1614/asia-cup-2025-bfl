import React from 'react';

const Tabs = ({ sheetNames, activeSheet, setActiveSheet }) => {
  return (
    <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', flexWrap: 'wrap' }}>
      {sheetNames.map(name => (
        <button
          key={name}
          style={{
            padding: '10px 20px',
            cursor: 'pointer',
            backgroundColor: name === activeSheet ? '#4CAF50' : '#f0f0f0',
            color: name === activeSheet ? '#fff' : '#000',
            border: 'none',
            borderRadius: '5px',
          }}
          onClick={() => setActiveSheet(name)}
        >
          {name}
        </button>
      ))}
    </div>
  );
};

export default Tabs;
