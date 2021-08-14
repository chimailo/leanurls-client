import React from 'react';
import { ApolloError } from '@apollo/client';
import { useRouter } from 'next/router';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Button, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useUser } from '../lib/hooks';

const useStyles = makeStyles(() =>
  createStyles({
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      height: '100vh',
    },
  })
);

export default function ErrorReload({ error }: { error?: ApolloError }) {
  const { user } = useUser();
  const router = useRouter();
  const classes = useStyles();

  return (
    <span className={classes.wrapper}>
      <Typography
        variant='h6'
        style={{ display: 'flex', alignItems: 'center' }}
      >
        <ErrorOutlineIcon />
        &nbsp;
        {error?.name}
      </Typography>
      <Typography>An unexpected error ocurred, please try again.</Typography>
      <Button
        disableElevation
        color='secondary'
        variant='contained'
        startIcon={<RefreshIcon />}
        onClick={() => {
          user?.getIdToken(true);
          router.reload();
        }}
      >
        Retry
      </Button>
    </span>
  );
}
