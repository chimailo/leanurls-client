import React from 'react'
import { ApolloError } from '@apollo/client';
import { useRouter } from "next/router";
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import RefreshIcon from '@material-ui/icons/Refresh';
import { Box, Button, Container, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
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
  const router = useRouter()
  const classes = useStyles()
  
  return (
    <span className={classes.wrapper}>
      <Typography variant='h6'>
        <ErrorOutlineIcon />&nbsp;
        {error?.name}
      </Typography>
      <Typography>
        An unexpected error ocurred, please try again.
      </Typography>
      <Button
        disableElevation
        color='secondary'
        variant='contained'
        startIcon={<RefreshIcon />}
        onClick={() => router.reload()}
      >
        Retry
      </Button>
    </span>
  )
}
