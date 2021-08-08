import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { ApolloError } from '@apollo/client';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { Paper, Typography, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

import Link from '../src/components/Link';
import Wrapper from '../src/components/Wrapper';
import LoginForm from '../src/components/forms/Login';
import firebase from '../src/lib/firebase';
import { bg } from '../src/lib/constants';
import { getToken } from '../src/lib/utils';
import { useUser } from '../src/lib/hooks';
import * as ROUTES from '../src/lib/routes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundImage: bg,
    },
    paper: {
      width: '100%',
      padding: theme.spacing(3, 5),
      [theme.breakpoints.up('sm')]: {
        maxWidth: '500px',
        boxShadow: theme.shadows[3],
        padding: theme.spacing(5, 10),
        margin: theme.spacing(4, 'auto'),
      },
    },
  })
);

interface AuthError {
  code: string;
  message: string;
}

export default function Login() {
  const [error, setError] = useState<AuthError | null>(null);
  const [alert, setAlert] = useState(false);
  const classes = useStyles();
  const router = useRouter();
  const { isAuthenticated, user } = useUser();

  useEffect(() => {
    if (getToken() && isAuthenticated && !user?.isAnonymous) {
      router.replace(ROUTES.DASHBOARD);
    }
  }, [getToken, isAuthenticated, user]);

  return (
    <React.Fragment>
      <Head>
        <title>Login | LeanUrls</title>
      </Head>
      <Wrapper page='login'>
        <div className={classes.root}>
          <Grid
            container
            alignItems='center'
            justify='center'
            style={{ minHeight: '100vh' }}
          >
            <Grid item xs={12} sm={8} md={6} component='main'>
              <Paper color='primary' elevation={0} className={classes.paper}>
                <Typography
                  component='h4'
                  variant='h6'
                  align='center'
                  noWrap
                  style={{ marginTop: 40 }}
                >
                  Log in to your account.
                </Typography>
                {alert && (
                  <Alert severity='error' onClose={() => setAlert(false)}>
                    <AlertTitle>{error?.code}</AlertTitle>
                    {error?.message}
                  </Alert>
                )}
                <Formik
                  initialValues={{
                    email: '',
                    password: 'password',
                  }}
                  onSubmit={async ({ email, password }) => {
                    try {
                      await firebase
                        .auth()
                        .signInWithEmailAndPassword(email, password);
                    } catch (error) {
                      const errorCode =
                        error.code === 'auth/invalid-email'
                          ? 'Invalid email'
                          : error.code === 'auth/user-disabled'
                          ? 'Account disabled'
                          : 'User not found';
                      const errorMsg =
                        error.code === 'auth/wrong-password' ||
                        error.code === 'auth/user-not-found'
                          ? 'Either no user with that email exist or the password is invalid.'
                          : error.message;

                      setError({
                        code: errorCode,
                        message: errorMsg,
                      });
                      setAlert(true);
                    }
                  }}
                >
                  {(props) => <LoginForm formik={props} />}
                </Formik>
                <Typography variant='body2' style={{ marginTop: '2rem' }}>
                  Don't have an account?
                  <Link href={ROUTES.SIGNUP} color='primary'>
                    <strong> Sign up here.</strong>
                  </Link>
                </Typography>
                <Typography
                  paragraph
                  variant='body2'
                  style={{ marginTop: '2rem' }}
                >
                  <Link href={ROUTES.PASSWORD_FORGET} color='primary'>
                    Forgot your password?
                  </Link>
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Wrapper>
    </React.Fragment>
  );
}
