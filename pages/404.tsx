import React from 'react';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Wrapper from '../src/components/Wrapper';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    main: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'calc(100vh - 54px - 40px)',
    },
    text: {
      fontSize: '1.8rem',
      marginBottom: theme.spacing(2),
      [theme.breakpoints.down('xs')]: {
        fontSize: '1.5rem',
      },
    },
  })
);

export default function Custom404() {
  const classes = useStyles();

  return (
    <Wrapper>
      <Container maxWidth='md'>
        <main className={classes.main}>
          <div>
            <Typography component='h5' align='center' className={classes.text}>
              We are sorry, the page you requested cannot be found.
            </Typography>
            <Typography align='center'>
              The URL may be misspelled or the page you're looking for is no
              longer available.
            </Typography>
          </div>
        </main>
      </Container>
    </Wrapper>
  );
}
