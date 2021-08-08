import React from 'react';
import { useRouter } from 'next/router';
import DoneIcon from '@material-ui/icons/Done';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Button, Container, Grid, Hidden, Typography } from '@material-ui/core';
import {
  createStyles,
  Theme,
  makeStyles,
  withStyles,
} from '@material-ui/core/styles';

import UrlForm from '../src/components/urlForm';
import Wrapper from '../src/components/Wrapper';
import * as ROUTES from '../src/lib/routes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
    },
    textColor: {
      color: theme.palette.grey[100],
    },
  })
);

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
  const classes = useStyles();
  const router = useRouter();
  const features = [
    'Easy Link Shortening',
    'Full Link History',
    'Customized LeanURLs',
  ];

  return (
    <Wrapper page='landing'>
      <Container maxWidth='lg' className={classes.container}>
        <Grid container>
          <Hidden xsDown>
            <Grid item xs={12} sm={6} style={{ paddingRight: '1rem' }}>
              <Typography
                variant='h3'
                component='h1'
                paragraph
                className={classes.textColor}
              >
                <strong>Same link destination, shorter url</strong>
              </Typography>
              <Typography
                variant='subtitle1'
                className={classes.textColor}
                style={{ fontSize: '1.15rem' }}
              >
                LeanUrls is a service that transforms your urls into a short and
                concise form. Create a free account to enjoy:
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
  );
}

function Features({ features }: { features: string[] }) {
  const classes = useStyles();

  return (
    <List component='nav' aria-label='features'>
      {features.map((feature, index) => (
        <ListItem key={index}>
          <ListItemIcon>
            <DoneIcon className={classes.textColor} />
          </ListItemIcon>
          <ListItemText primary={feature} className={classes.textColor} />
        </ListItem>
      ))}
    </List>
  );
}
