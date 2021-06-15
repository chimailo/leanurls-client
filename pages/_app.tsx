import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client/react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import UserProvider from '../src/context/user'
import { theme } from '../src/lib/theme';
import { useApollo } from '../src/lib/hooks'
import { setToken } from '../src/lib/auth';
import firebase from '../src/lib/firebase';

export default function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps)

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
}, []);

  React.useEffect(() => {
    try {
      const unsubscriber = firebase.auth().onAuthStateChanged(async user => {
        if (user) {
          setToken(await user.getIdToken())
        }
      })
      return () => unsubscriber()
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <React.Fragment>
      <Head>
        <title>LeanUrls | ...for your convenience</title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </ApolloProvider>
    </React.Fragment>
  );
}
