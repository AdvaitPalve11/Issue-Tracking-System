import { useState, useEffect } from 'react';

export const useServerConnection = () => {
  const [serverUrl, setServerUrl] = useState(localStorage.getItem('server_url'));
  const [isDiscovering, setIsDiscovering] = useState(!localStorage.getItem('server_url'));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (serverUrl) {
      // Verify existing
      fetch(`${serverUrl}/auth/health`)
        .then(res => res.ok ? res.text() : Promise.reject('Not OK'))
        .then(() => setIsDiscovering(false))
        .catch(() => {
          localStorage.removeItem('server_url');
          setServerUrl(null);
          setIsDiscovering(true);
        });
      return;
    }

    if (isDiscovering) {
      discoverServer();
    }
  }, [serverUrl, isDiscovering]);

  const discoverServer = async () => {
    setIsDiscovering(true);
    setError(null);

    const candidates = new Set();
    candidates.add(`http://localhost:8080`);
    
    const hostname = window.location.hostname;
    if (hostname && hostname !== 'localhost') {
      candidates.add(`http://${hostname}:8080`);
      
      // If it looks like an IPv4 address, guess the subnet
      const parts = hostname.split('.');
      if (parts.length === 4) {
        const base = `${parts[0]}.${parts[1]}.${parts[2]}`;
        // Add a few common ones first
        candidates.add(`http://${base}.1:8080`);
        candidates.add(`http://${base}.100:8080`);
        // Then add all others (we will scan in batches to avoid overwhelming browser)
        for (let i = 1; i <= 254; i++) {
          candidates.add(`http://${base}.${i}:8080`);
        }
      }
    }

    const candidateArray = Array.from(candidates);
    let found = false;

    // We can run fetch requests in parallel, but to avoid browser limits, we batch them.
    const BATCH_SIZE = 20;
    for (let i = 0; i < candidateArray.length; i += BATCH_SIZE) {
      if (found) break;
      const batch = candidateArray.slice(i, i + BATCH_SIZE);
      
      const promises = batch.map(url => {
        return new Promise((resolve, reject) => {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => {
            controller.abort();
            reject(new Error('timeout'));
          }, 1500); // 1.5s timeout for local network

          fetch(`${url}/auth/health`, { signal: controller.signal })
            .then(res => {
              clearTimeout(timeoutId);
              if (res.ok) resolve(url);
              else reject(new Error('not ok'));
            })
            .catch(err => {
              clearTimeout(timeoutId);
              reject(err);
            });
        });
      });

      try {
        const winningUrl = await Promise.any(promises);
        found = true;
        setServerUrl(winningUrl);
        localStorage.setItem('server_url', winningUrl);
        setIsDiscovering(false);
        return; // Success!
      } catch (e) {
        // Promise.any rejects if ALL promises in the batch reject. Continue to next batch.
      }
    }

    setIsDiscovering(false);
    setError('Could not automatically discover server. Please enter the URL manually.');
  };

  const manualConnect = (url) => {
    let finalUrl = url;
    if (!url.startsWith('http')) finalUrl = 'http://' + url;
    localStorage.setItem('server_url', finalUrl);
    setServerUrl(finalUrl);
    setIsDiscovering(true); // Re-trigger verify
  };

  return { serverUrl, isDiscovering, error, manualConnect, retry: discoverServer };
};
