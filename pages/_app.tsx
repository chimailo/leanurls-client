import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client/react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import UserContext from '../src/lib/user-context';
import { theme } from '../src/lib/theme';
import { useApollo } from '../src/lib/hooks';

export default function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps);

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>LeanUrls | ...for your convenience</title>
        <meta charSet='utf-8' />
        <meta httpEquiv='X-UA-Compatible' content='IE=edge' />
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <ApolloProvider client={apolloClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <UserContext>
            <Component {...pageProps} />
          </UserContext>
        </ThemeProvider>
      </ApolloProvider>
    </React.Fragment>
  );
}
