const apiUrl = process.env.REACT_APP_API_URL;

export const fetchWithoutToken = (endpoint, data, method = 'GET') => {
  const url = `${apiUrl}${endpoint}`;

  if (method === 'GET') {
    return fetch(url);
  } else {
    return fetch(url, {
      method,
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
};
