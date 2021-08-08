import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Paper, Typography, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

import firebase from '../src/lib/firebase';
import Link from '../src/components/Link';
import PasswordForget from '../src/components/forms/PasswordForget';
import Wrapper from '../src/components/Wrapper';
import { bg } from '../src/lib/constants';
import { getToken } from '../src/lib/utils';
import { validateEmail } from '../src/lib/validators';
import * as ROUTES from '../src/lib/routes';
import { useUser } from '../src/lib/hooks';

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

export default function Login() {
  // const [alert, setAlert] = useState<AlertProps | null>(null);
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
        <title>Reset Password | LeanUrls</title>
      </Head>
      <Wrapper page='forget'>
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
                  Reset your password.
                </Typography>
                {/* {alert && (
                  <Alert
                    severity={alert.severity}
                    onClose={() => setAlert(null)}
                  >
                    <AlertTitle>{alert.severity}</AlertTitle>
                    {alert.message}
                  </Alert>
                )} */}
                <Formik
                  initialValues={{ email: '' }}
                  validateOnChange={false}
                  validationSchema={Yup.object({ email: validateEmail() })}
                  onSubmit={async ({ email }) => {
                    try {
                      await firebase.auth().sendPasswordResetEmail(email, {
                        url: `${process.env
                          .NEXT_PUBLIC_HOST_URL!}?email=${email}`,
                      });
                    } catch (error) {
                      console.log('error: ', error);
                    }
                  }}
                >
                  {(props) => <PasswordForget formik={props} />}
                </Formik>
                <Typography
                  gutterBottom
                  variant='body2'
                  style={{ marginTop: '2rem' }}
                >
                  <Link href={ROUTES.LOGIN} color='primary'>
                    Go back to login
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
