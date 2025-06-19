import React from 'react';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#8B5CF6',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{
        textAlign: 'center',
        backgroundColor: 'white',
        color: '#8B5CF6',
        padding: '40px',
        borderRadius: '20px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>
          🏛️ Spec Stats
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
          Monitor COT + Carry Trade
        </p>
        <div style={{
          backgroundColor: '#10B981',
          color: 'white',
          padding: '15px',
          borderRadius: '10px'
        }}>
          <strong>✅ ¡FUNCIONANDO PERFECTAMENTE!</strong>
        </div>
      </div>
    </div>
  );
}

export default App;
