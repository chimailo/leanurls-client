import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { Paper, Typography, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

import CircularLoading from '../src/components/Loading';
import firebase from '../src/lib/firebase';
import Link from '../src/components/Link';
import SignupForm from '../src/components/forms/Signup';
import Wrapper from '../src/components/Wrapper';
import * as ROUTES from '../src/lib/routes';
import { bg } from '../src/lib/constants';
import { getToken, setToken } from '../src/lib/utils';
import { useCreateUserMutation } from '../src/generated/graphql';
import { useUser } from '../src/lib/hooks';
import {
  validateName,
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
} from '../src/lib/validators';

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
    loading: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    },
  })
);

interface AuthError {
  code: string;
  message: string;
}

export default function Signup() {
  const [error, setError] = useState<AuthError>();
  const [alert, setAlert] = useState(false);
  const [createUser, { data, loading }] = useCreateUserMutation();
  const classes = useStyles();
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (user && !loading && data) {
      user.updateProfile({
        displayName: data.createUser?.name,
        photoURL: data.createUser?.avatar,
      });
      router.replace(ROUTES.DASHBOARD);
    }
  }, [loading, data, user]);

  if (loading) {
    return (
      <div className={classes.loading}>
        <CircularLoading size={40} />
      </div>
    );
  }

  return (
    <React.Fragment>
      <Head>
        <title>Sign up | LeanUrls</title>
      </Head>
      <Wrapper page='signup'>
        <Grid container alignItems='center' justify='center'>
          <Grid item xs={12} sm={8} md={6} component='main'>
            <Paper color='primary' elevation={0} className={classes.paper}>
              <Typography
                component='h4'
                variant='h6'
                align='center'
                noWrap
                style={{ marginTop: 40 }}
              >
                Create your account.
              </Typography>
              {alert && (
                <Alert severity='error' onClose={() => setAlert(false)}>
                  <AlertTitle>{error?.code}</AlertTitle>
                  {error?.message}
                </Alert>
              )}
              <Formik
                initialValues={{
                  name: '',
                  email: '',
                  password: 'password',
                  password2: 'password',
                }}
                validateOnChange={false}
                validationSchema={Yup.object({
                  name: validateName(),
                  email: validateEmail(),
                  password: validatePassword(),
                  password2: validatePasswordConfirm(),
                })}
                onSubmit={async ({ name, email, password }) => {
                  try {
                    let authUser;

                    if (getToken()) {
                      const credential =
                        firebase.auth.EmailAuthProvider.credential(
                          email,
                          password
                        );
                      authUser = await firebase
                        .auth()
                        .currentUser?.linkWithCredential(credential);
                    } else {
                      authUser = await firebase
                        .auth()
                        .createUserWithEmailAndPassword(email, password);
                    }

                    if (authUser && authUser?.user) {
                      setToken(await authUser.user.getIdToken());
                      await createUser({
                        variables: { name, email },
                      });
                    }
                  } catch (err) {
                    setError({
                      code: 'Error',
                      message: err.message,
                    });
                    setAlert(true);
                  }
                }}
              >
                {(props) => <SignupForm formik={props} />}
              </Formik>
              <Typography
                variant='body2'
                style={{ marginTop: '2rem' }}
                gutterBottom
              >
                Already have an account?
                <Link href={ROUTES.LOGIN} color='primary'>
                  <strong> Login here.</strong>
                </Link>
              </Typography>
              <Typography variant='body2' paragraph>
                By clicking the sign up button, you agree to our
                <Link href={ROUTES.TERMS} color='primary'>
                  {' terms'}
                </Link>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Wrapper>
    </React.Fragment>
  );
}
