import React, { useState } from 'react'
import { ApolloError } from '@apollo/client';
import { Formik } from 'formik';
import { useRouter } from 'next/router'
import * as Yup from 'yup'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { Box, Button, Container, Grid, Hidden, Typography } from "@material-ui/core"
import { createStyles, Theme, makeStyles, withStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import { Alert, AlertTitle } from '@material-ui/lab';

import NewLinkForm from '../src/components/forms/NewLink';
import Wrapper from '../src/components/Wrapper';
import { useMeQuery } from '../src/generated/graphql';
import { validateLink, validateAlias } from '../src/lib/validators';
import * as ROUTES from "../src/lib/routes"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    },
    textColor: {
      color: theme.palette.grey[100],
    },
    paper: {
      width: '100%',
      padding: theme.spacing(3),
      [theme.breakpoints.up('sm')]: {
        maxWidth: '500px',
        boxShadow: theme.shadows[3],
        padding: theme.spacing(5, 6),
        margin: theme.spacing(4, 'auto'),
      },
    },
  })
)

const StyledButton = withStyles((theme: Theme) => ({
  root: {
    borderRadius: 8,
    letterSpacing: 1.1,
    textTransform: 'capitalize',
    marginTop: theme.spacing(3),
    padding: theme.spacing(1.5, 4),
    fontWeight: theme.typography.fontWeightBold,
  },
}))(Button);

export default function Home() {
  const [alert, setAlert] = useState<ApolloError | null>(null)
  const classes = useStyles()
  const router = useRouter()
  const { data, loading, error } = useMeQuery({
    notifyOnNetworkStatusChange: true,
  })
  const features = [
    'Easy Link Shortening',
    'Full Link History',
    'Customized LeanURLs',
  ]

  return (
    <React.Fragment>
      {loading
        ?
          <Box display='flex' alignItems='center' justifyContent='center' height='100vh'>
            <Typography variant="h5" color='secondary'>
              Loading...
            </Typography>
          </Box>
        : error
          ?
            <Box display='flex' alignItems='center' justifyContent='center' height='100vh'>
              {
                alert &&
                  <Alert severity='error' onClose={() => setAlert(null)}>
                    <AlertTitle>{alert.name}</AlertTitle>
                    {alert.message}
                  </Alert>
              }
            </Box>
          :
            <Wrapper user={data?.me}>
              <Container maxWidth='lg' className={classes.container}>
                <Grid container>
                  <Hidden xsDown>
                    <Grid item xs={12} sm={6} style={{ paddingRight: '1rem' }}>
                      <Typography variant='h3' component='h1' paragraph className={classes.textColor}>
                        <strong>Same link destination, shorter url</strong>
                      </Typography>
                      <Typography
                        variant='subtitle1'
                        className={classes.textColor}
                        style={{ fontSize: '1.15rem' }}
                      >
                        LeanUrls is a service that transforms your urls into a short and concise form. Create a free account to enjoy:
                      </Typography>
                      <Features features={features} />
                      <StyledButton
                        size='large'
                        color='secondary'
                        variant='contained'
                        onClick={() => router.push(ROUTES.SIGNUP)}
                      >
                        create free account
                      </StyledButton>
                    </Grid>
                  </Hidden>
                  <Grid item xs={12} sm={6}>
                    <UrlForm />
                  </Grid>
                </Grid>
              </Container>
            </Wrapper>
      }
      </React.Fragment>
  )
}

function Features({features}: {features: string[]}) {
  const classes = useStyles()
  
  return (
    <List component="nav" aria-label="features">
      {features.map((feature, index) => 
        <ListItem key={index}>
          <ListItemIcon>
            <DoneIcon className={classes.textColor} />
          </ListItemIcon>
          <ListItemText primary={feature} className={classes.textColor} />
        </ListItem>
      )}
    </List>
  )
}

function UrlForm() {
  const classes = useStyles()

  return (
    <Paper color='primary' elevation={0} className={classes.paper}>
      <Formik
        initialValues={{
          link: '',
          alias: '',
          domain: 'https://leanurls.web.app/',
        }}
        validationSchema={Yup.object({
          alias: validateAlias(),
          link: validateLink(),
        })}
        onSubmit={async ({ link, alias }) => {
          try {
            // saveLink(link, alias)
          } catch (error) {}
        }}
      >
        {(props) => <NewLinkForm formik={props} />}
      </Formik>
    </Paper>
  )
}
