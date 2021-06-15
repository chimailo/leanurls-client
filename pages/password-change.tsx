import React, { useState } from "react";
import Head from 'next/head'
import { useRouter } from "next/router";
import * as Yup from 'yup'
import { Formik } from "formik";
import { Paper, Typography, Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {Alert, AlertTitle} from '@material-ui/lab';

import firebase from "../src/lib/firebase";
import Link from '../src/components/Link'
import PasswordChange from "../src/components/forms/PasswordChange";
import Wrapper from '../src/components/Wrapper'
import { bg } from "../src/lib/constants";
import { setToken } from "../src/lib/auth";
import { validatePassword, validatePasswordConfirm } from '../src/lib/validators'
import * as ROUTES from "../src/lib/routes"

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
  title: string
  severity: 'error' | 'success' | 'info' | 'warning';
}

export default function Signup() {
  const [alert, setAlert] = useState<AlertProps | null>(null)
  const classes = useStyles();
  const router = useRouter()

  return (
    <React.Fragment>
      <Head>
        <title>Change Password | LeanUrls</title>
      </Head>
      <Wrapper>
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
                Change your password.
              </Typography>
              {alert && <Alert severity={alert.severity} onClose={() => setAlert(null)}>
                <AlertTitle>{alert.title}</AlertTitle>
                {alert.message}
              </Alert>}
              <Formik
                initialValues={{
                  password: '',
                  password2: ''
                }}
                validateOnChange={false}
                validationSchema={Yup.object({
                  password: validatePassword(),
                  password2: validatePasswordConfirm(),
                })}
                onSubmit={async ({ password }) => {
                  try {
                    await firebase.auth().currentUser?.updatePassword(password)
                  } catch (error) {
                    console.log(error)
                    setAlert({
                      message: error?.message,
                      severity: 'error',
                      title: error.code.split('/')[1]
                    })
                    setToken('')
                    router.push(ROUTES.LOGIN)
                  }
                }}
              >
                {(props) => <PasswordChange formik={props} />}
              </Formik>
              <Typography
                variant='body2'
                style={{ marginTop: '2rem' }}
                gutterBottom
              >
                <Link href={ROUTES.DASHBOARD} color='secondary'>
                  Go back to dashboard
                </Link>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Wrapper>
    </React.Fragment>
  )
}