import React from "react";
import { Formik } from "formik";
import { Paper, Typography, Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Header from '../Header'
import Link from '../Link'
import Layout from '../Layout'
import LoginForm from '../forms/Login'
import useFirebase from "../../useFirebase";
import * as ROUTES from "../../lib/routes"
import { bg } from "../../lib/constants";

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
    form: {
      margin: 'auto',
      maxWidth: 400,
    },
    field: {
      marginTop: theme.spacing(3),
    },
    button: {
      borderRadius: 8,
      fontSize: '1rem',
      textTransform: 'capitalize',
      marginTop: theme.spacing(4),
      fontWeight: theme.typography.fontWeightBold,
    },
  })
);

export default function Login() {
  const classes = useStyles()
  const firebase = useFirebase()

  return (
    <Layout title='Login'>
    <div className={classes.root}>
      <Header landing />
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
          {/* <LoginForm /> */}
              <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                onSubmit={async ({email, password}) => {
                    try {
                    firebase.doSignInWithEmailAndPassword(email, password)
                    } catch (error) {}
                }}
              >
                {(props) => <LoginForm formik={props} />}
              </Formik>
              <Typography
                variant='body2'
                style={{ marginTop: '2rem' }}
                gutterBottom
              >
                Don't have an account?
                <Link to={ROUTES.SIGNUP} color='primary'>
                  <strong> Sign up here.</strong>
                </Link>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </Layout>
  )
}