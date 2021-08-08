import React from 'react';
import { UserContext } from '../lib/user-context';
import { APOLLO_STATE_PROP_NAME, initializeApollo } from './apolloClient';

export function useApollo(pageProps: any) {
  const state = pageProps[APOLLO_STATE_PROP_NAME];
  const store = React.useMemo(() => initializeApollo(state), [state]);
  return store;
}

export const useUser = () => React.useContext(UserContext);
