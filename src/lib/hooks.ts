import { useContext, useMemo } from 'react'
import { APOLLO_STATE_PROP_NAME, initializeApollo } from './apolloClient'
import { UserContext } from "../context/user"

export function useApollo(pageProps: any) {
    const state = pageProps[APOLLO_STATE_PROP_NAME]
    const store = useMemo(() => initializeApollo(state), [state])
    return store
}

export const useUser = () => useContext(UserContext)
