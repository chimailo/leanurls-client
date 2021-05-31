import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import { AppBarProps, Box, Button, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Footer from '../Footer';
import Header from '../Header';
import Layout from '../Layout';
import { isLoggedIn } from '../../lib/auth';
import * as ROUTES from '../../lib/routes'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    field: {
      marginTop: theme.spacing(2),
    },
    button: {
      marginTop: '3rem',
      color: theme.palette.background.paper,
    },
  })
);

export default function Dashboard() {
  const classes = useStyles();
  const headerProps = {
    page: 'dashboard',
    bgColor: 'secondary' as AppBarProps["color"]
  }
  
  return (
    <Layout title='Dashboard' headerProps={headerProps}>
        <div className="">Dashboard</div>
    </Layout>
  );
}
