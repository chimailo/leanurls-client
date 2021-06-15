import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from 'next/router'
import { Formik } from "formik";
import { Paper, Typography, Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {Alert, AlertTitle} from '@material-ui/lab';

import Link from '../src/components/Link'
import Wrapper from '../src/components/Wrapper'
import LoginForm from '../src/components/forms/Login'
import firebase from "../src/lib/firebase";
import * as ROUTES from "../src/lib/routes"
import { bg } from "../src/lib/constants";
import { isLoggedIn } from "../src/lib/auth";
import { useUser } from "../src/lib/hooks";
import { useMeLazyQuery } from "../src/generated/graphql";

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

export interface AlertProps {
  message: string
  severity: 'error' | 'success' | 'info' | 'warning';
}

export default function Login() {
  const [alert, setAlert] = useState<AlertProps | null>(null)
  const classes = useStyles()
  const router = useRouter()

  if (isLoggedIn()) {
    router.replace(ROUTES.DASHBOARD)
  }

  return (
    <React.Fragment>
      <Head>
        <title>Login | LeanUrls</title>
      </Head>
      <Wrapper>
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
                {alert && <Alert severity={alert.severity} onClose={() => setAlert(null)}>
                  <AlertTitle>{alert.severity}</AlertTitle>
                  {alert.message}
                </Alert>}
                <Formik
                  initialValues={{
                      email: '',
                      password: '',
                  }}
                  onSubmit={async ({email, password}) => {
                    try {
                      const { user } = await firebase.auth().signInWithEmailAndPassword(email, password)
                      if (user) router.replace(ROUTES.DASHBOARD)
                    } catch (error) {
                      console.log('error: ', error)
                      error && setAlert({ message: error.message, severity: 'error' })
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
                <Typography paragraph variant='body2' style={{ marginTop: '2rem' }}>
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
  )
}