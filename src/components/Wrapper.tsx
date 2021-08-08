import React from 'react';
import { Box } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Footer from './Footer';
import Header from './Header';
import { bg } from '../lib/constants';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    box: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundImage: (props: LayoutProps) => (props.page ? bg : 'unset'),
      backgroundColor: (props: LayoutProps) =>
        props.page ? 'unset' : theme.palette.background.default,
    },
  })
);

interface LayoutProps {
  page?: string;
}

const Wrapper: React.FC<LayoutProps> = (props) => {
  const classes = useStyles(props);
  const { children, page } = props;

  return (
    <div className={classes.box}>
      <Box flexGrow={1}>
        <Header page={page} />
        {children}
      </Box>
      <Footer page={page} />
    </div>
  );
};

export default Wrapper;
