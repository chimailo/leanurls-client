import router from 'next/router';
import * as ROUTES from './routes';

export const isBrowser = typeof window !== `undefined`;

export const getToken = () =>
  window.localStorage.leanurlsUser ? window.localStorage.leanurlsUser : '';

export const logout = (callback: () => void) => {
  if (!isBrowser) return;

  callback();
  setToken('');
  router.replace(ROUTES.LOGIN);
};

export const setToken = (token: string) =>
  (window.localStorage.leanurlsUser = token);

export const genRnHex = (size: number) =>
  [...Array(size)]
    .map(() => Math.floor(Math.random() * 16).toString(16))
    .join('');
