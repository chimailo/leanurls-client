import React from "react";
import * as Yup from 'yup'
import { Formik } from "formik";
import { Paper, Typography, Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Header from '../Header'
import Link from '../Link'
import Layout from '../Layout'
import SignupForm from '../forms/Signup'
import useFirebase from "../../useFirebase";
import * as ROUTES from "../../lib/routes"
import { bg } from "../../lib/constants";
import { validateName, validateEmail, validatePassword, validatePasswordConfirm } from '../../lib/validators'

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
      maxWidth: 400,
      margin: 'auto',
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

export default function Signup() {
  const classes = useStyles();
  const firebase = useFirebase()
  
  return (
    <Layout title='Login'>
      <div className={classes.root}>
        <Header landing />
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
            {/* <LoginForm /> */}
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
                  firebase.doCreateUserWithEmailAndPassword(email, password)
                } catch (error) {}
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
              <Link to={ROUTES.LOGIN} color='primary'>
                <strong> Login here.</strong>
              </Link>
            </Typography>
            <Typography variant='body2' paragraph>
              By clicking the sign up button, you agree to our
              <Link to={ROUTES.TERMS} color='primary'>
                {' terms'}
              </Link>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
    </Layout>
  )
}