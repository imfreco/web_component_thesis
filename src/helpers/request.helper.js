import { items } from '../fixtures/items.store';
import { logIn, logOut } from '../actions/authentication.action';
import Swal from 'sweetalert2';
import { decode } from 'jsonwebtoken';

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

export const fetchProtectedResource = (
  endpoint,
  data,
  method = 'GET',
  token
) => {
  const url = `${apiUrl}${endpoint}`;

  if (method === 'GET') {
    return fetch(url, {
      method,
      headers: {
        Authorization: token,
      },
    });
  } else {
    return fetch(url, {
      method,
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify(data),
    });
  }
};

export const fetchWithToken = async (
  endpoint,
  data,
  method = 'GET',
  token,
  dispatch
) => {
  let res;

  res = await fetchProtectedResource(endpoint, data, method, token);

  if (res.status === 401) {
    const token = localStorage.getItem(items.refreshToken);
    const resrtr = await fetchProtectedResource(
      'auth/refresh',
      {},
      'GET',
      token
    );
    const body = await resrtr.json();

    if (body.status) {
      Swal.fire('Tenga en cuenta', 'Su sesión ha finalizado', 'warning');
      localStorage.removeItem(items.refreshToken);
      dispatch(logOut());
    } else {
      // console.log('autenticación silenciosa');
      const { id_token, refresh_token } = body;
      const { user, name, lastname, roles } = decode(id_token);
      localStorage.setItem(items.refreshToken, refresh_token);
      dispatch(logIn({ id: user, name, lastname, roles, id_token }));
      res = await fetchProtectedResource(endpoint, data, method, id_token);
    }
  }

  return res;
};
