import { useState } from 'react';
import { useServerConnection } from './useServerConnection';

const ServerConnectionUI = ({ children }) => {
  const { serverUrl, isDiscovering, error, manualConnect, retry } = useServerConnection();
  const [manualUrl, setManualUrl] = useState('');

  if (serverUrl && !isDiscovering) {
    return children;
  }

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h1>Connecting to Issue Tracker</h1>
      
      {isDiscovering && (
        <div style={{ margin: '2rem 0' }}>
          <p>Scanning local network for the server...</p>
          <div className="spinner" style={{ margin: '1rem auto', width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #3498db', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          <style>{`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      {error && !isDiscovering && (
        <div style={{ marginTop: '2rem' }}>
          <p style={{ color: 'red' }}>{error}</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            <button onClick={retry} style={{ padding: '0.5rem 1rem', cursor: 'pointer', background: '#3498db', color: '#fff', border: 'none', borderRadius: '4px' }}>
              Retry Auto-Discovery
            </button>
            <div style={{ margin: '1rem 0' }}>OR</div>
            <div>
              <input 
                type="text" 
                value={manualUrl} 
                onChange={(e) => setManualUrl(e.target.value)} 
                placeholder="e.g. 192.168.1.100:8080" 
                style={{ padding: '0.5rem', width: '250px', marginRight: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
              />
              <button onClick={() => manualConnect(manualUrl)} style={{ padding: '0.5rem 1rem', cursor: 'pointer', background: '#2ecc71', color: '#fff', border: 'none', borderRadius: '4px' }}>
                Connect Manually
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServerConnectionUI;