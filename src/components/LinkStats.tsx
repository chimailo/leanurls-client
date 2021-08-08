import React from 'react';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import Skeleton from '@material-ui/lab/Skeleton';
import { Grid, Typography } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { LinksDataQuery } from '../generated/graphql';

const useStyles = makeStyles(() =>
  createStyles({
    gridItem: {
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    numbers: {
      fontWeight: 500,
    },
    text: {
      fontSize: '0.875rem',
    },
  })
);

export default function LinkStats({
  data,
  loading,
}: {
  data: LinksDataQuery;
  loading: boolean;
}) {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={6} sm={4} className={classes.gridItem}>
        <Typography variant='h5' color='secondary' className={classes.numbers}>
          {data.getMyLinksCount}
        </Typography>
        <Typography color='textSecondary' className={classes.text}>
          {loading ? <Skeleton /> : 'Number of links'}
        </Typography>
      </Grid>
      <Grid item xs={6} sm={4} className={classes.gridItem}>
        <Typography variant='h5' color='secondary' className={classes.numbers}>
          {data.getMyHitsCount}
        </Typography>
        <Typography color='textSecondary' className={classes.text}>
          {loading ? <Skeleton /> : 'Total number of hits'}
        </Typography>
      </Grid>
      <Grid item xs={6} sm={4} className={classes.gridItem}>
        <Typography variant='h5' color='secondary' className={classes.numbers}>
          {!data.getMyLastHitTime
            ? 'N/A'
            : formatDistanceToNowStrict(new Date(data.getMyLastHitTime)).split(
                ' '
              )[0]}
        </Typography>
        {data.getMyLastHitTime && (
          <Typography color='textSecondary' className={classes.text}>
            Last hit{' '}
            {`(${
              formatDistanceToNowStrict(new Date(data.getMyLastHitTime)).split(
                ' '
              )[1]
            })`}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
}
