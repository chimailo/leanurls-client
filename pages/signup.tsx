import React, { useEffect, useState } from "react";
import Head from 'next/head'
import { useRouter } from "next/router";
import * as Yup from 'yup'
import { Formik } from "formik";
import { Paper, Typography, Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {Alert, AlertTitle} from '@material-ui/lab';

import firebase from "../src/lib/firebase";
import Link from '../src/components/Link'
import Wrapper from '../src/components/Wrapper'
import SignupForm from '../src/components/forms/Signup'
import * as ROUTES from "../src/lib/routes"
import { bg } from "../src/lib/constants";
import { isLoggedIn, setToken } from "../src/lib/auth";
import { validateName, validateEmail, validatePassword, validatePasswordConfirm } from '../src/lib/validators'
import { useCreateUserMutation } from "../src/generated/graphql";

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

export default function Signup() {
  const [alert, setAlert] = useState<AlertProps | null>(null)
  const [createUser] = useCreateUserMutation()
  const classes = useStyles();
  const router = useRouter()

  if (isLoggedIn()) {
    router.replace(ROUTES.DASHBOARD)
  }

  return (
    <React.Fragment>
      <Head>
        <title>Sign up | LeanUrls</title>
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
                Create your account.
              </Typography>
              {alert && <Alert severity={alert.severity} onClose={() => setAlert(null)}>
                <AlertTitle>{alert.severity}</AlertTitle>
                {alert.message}
              </Alert>}
              <Formik
                initialValues={{
                    name: '',
                    email: '',
                    password: '',
                    password2: '',
                }}
                validateOnChange={false}
                validationSchema={Yup.object({
                  name: validateName(),
                  email: validateEmail(),
                  password: validatePassword(),
                  password2: validatePasswordConfirm(),
                })}
                onSubmit={async ({name, email, password}) => {
                  try {
                    const { user } = await firebase.auth().createUserWithEmailAndPassword(email, password)
                    console.log('creating user')
                    if (user) {
                      setToken(await user.getIdToken())
                      await createUser({
                        variables: { name, email },
                      })
                    }
                    console.log('creating user... done')
                  } catch (err) {
                    console.log(err)
                    if (err) setAlert({ message: err?.message, severity: 'error' })
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
  )
}