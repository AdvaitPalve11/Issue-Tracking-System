// apiClient.js
// Exports a configured base URL and helper fetch methods

export const getBaseUrl = () => {
    return localStorage.getItem('server_url') || 'http://localhost:8080';
};

export const apiFetch = async (endpoint, options = {}) => {
    const url = `${getBaseUrl()}${endpoint}`;
    
    // Add default headers, e.g., JSON
    const headers = {
        'Content-Type': 'application/json',
        ...options.headers
    };

    // Include auth token if needed here in the future
    // const token = localStorage.getItem('token');
    // if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch(url, {
        ...options,
        headers
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
    }

    // Some endpoints like /health return text instead of JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    }
    return response.text();
};
