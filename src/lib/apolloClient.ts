import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { offsetLimitPagination } from '@apollo/client/utilities';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { setContext } from '@apollo/client/link/context';
// import { concatPagination } from '@apollo/client/utilities'
import merge from 'ts-deepmerge';
// @ts-ignore
import isEqual from 'lodash/isEqual';
import firebase from './firebase';
import { getToken, setToken } from './utils';

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

const resetToken = () => {
  const user = firebase.auth().currentUser;
  user?.getIdToken().then((token: string) => setToken(token));
};

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient() {
  const authLink = setContext((_, { headers }) => {
    const token = getToken();
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        resetToken();
        for (let err of graphQLErrors) {
          switch (err.extensions?.code) {
            case 'UNAUTHENTICATED':
              // Modify the operation context with a new token
              const oldHeaders = operation.getContext().headers;
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `Bearer ${getToken()}`,
                },
              });
              // Retry the request, returning the new observable
              return forward(operation);
          }
        }
      }
      // Retry on network errors
      if (networkError) {
        console.log(`[Network error]: ${networkError}`);
      }
    }
  );

  const httpLink = new HttpLink({
    uri: 'http://localhost:8000/graphql',
    credentials: 'same-origin',
  });

  const retryLink = new RetryLink();

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: from([authLink, errorLink, retryLink, httpLink]),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            getTableData: offsetLimitPagination(['sort']),
          },
        },
      },
    }),
  });
}

export function initializeApollo(initialState: IDBObjectStore) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // Hydrate initial state of page with data fetching methods that use Apollo Client
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();

    // Merge the existing cache into data passed from getStaticProps/getServerSideProps
    const data = merge(initialState, existingCache, {
      // combine arrays using object equality (like in sets)
      arrayMerge: (destinationArray: any[], sourceArray: any[]) => [
        ...sourceArray,
        ...destinationArray.filter((d) =>
          sourceArray.every((s) => !isEqual(d, s))
        ),
      ],
    });

    // Restore the cache with the merged data
    _apolloClient.cache.restore(data);
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === 'undefined') return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function addApolloState(
  client: ApolloClient<NormalizedCacheObject>,
  pageProps: any
) {
  if (pageProps?.props) {
    pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
  }

  return pageProps;
}
