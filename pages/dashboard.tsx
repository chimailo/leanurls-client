import React, { useEffect } from 'react';
import { Box, Container, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Pie } from 'react-chartjs-2';
import { useRouter } from 'next/router';

import CircularLoading from '../src/components/Loading';
import EnhancedTable from '../src/components/Table';
import ErrorReload from '../src/components/Reload';
import LinkStats from '../src/components/LinkStats';
import Wrapper from '../src/components/Wrapper';
import { genRnHex, getToken } from '../src/lib/utils';
import { useLinksDataQuery } from '../src/generated/graphql';
import { useUser } from '../src/lib/hooks';
import * as ROUTES from '../src/lib/routes';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    jumbotron: {
      padding: theme.spacing(3, 0),
      backgroundColor: theme.palette.grey[200],
    },
    gridItem: {
      display: 'flex',
      alignItems: 'center',
    },
  })
);

export default function Dashboard() {
  const router = useRouter();
  const classes = useStyles();
  const { user } = useUser();
  const { data, loading, error } = useLinksDataQuery({
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    console.log(!getToken());
    console.log(user && user.isAnonymous);
    if (!getToken() || (user && user.isAnonymous)) {
      router.replace(ROUTES.LOGIN);
    }
  }, [user?.isAnonymous]);

  const getChartLabels = () => data?.getChartData.map((item) => item.alias);
  const getChartValues = () => data?.getChartData.map((item) => item.hits);
  const getChartColors = () =>
    [...Array(data?.getChartData.length)].map(() => `#${genRnHex(6)}`);

  const chartConfig = {
    labels: getChartLabels(),
    datasets: [
      {
        label: '# of hits',
        data: getChartValues(),
        backgroundColor: getChartColors(),
      },
    ],
  };

  if (error) {
    return <ErrorReload error={error} />;
  }

  return (
    <Wrapper>
      {loading ? (
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          height='100vh'
        >
          <CircularLoading size={40} />
        </Box>
      ) : (
        <>
          {data && data.getChartData.length > 0 && (
            <div className={classes.jumbotron}>
              <Container maxWidth='lg'>
                <Grid container>
                  <Grid item xs={12} sm={6}>
                    <Pie type='pie' data={chartConfig} />
                  </Grid>
                  <Grid item xs={12} sm={6} className={classes.gridItem}>
                    <LinkStats data={data} loading={loading} />
                  </Grid>
                </Grid>
              </Container>
            </div>
          )}
        </>
      )}
      {data && <EnhancedTable totalItems={data.getChartData.length} />}
    </Wrapper>
  );
}
