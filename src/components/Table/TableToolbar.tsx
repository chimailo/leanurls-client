import React, { useState } from 'react';
import { ApolloQueryResult } from '@apollo/client';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FilterListIcon from '@material-ui/icons/FilterList';
import Hidden from '@material-ui/core/Hidden';
import InputBase from '@material-ui/core/InputBase';
import ReplayIcon from '@material-ui/icons/Replay';
import SearchIcon from '@material-ui/icons/Search';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IconButton, Toolbar, Tooltip, Typography } from '@material-ui/core';

import Filter from '../dialog/Filter';
import NewLinkModal from '../dialog/NewLink';
import { TableDataQuery } from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2),
    },
    search: {
      width: '100%',
      flex: '1 1 100%',
      position: 'relative',
      marginRight: theme.spacing(2),
      borderRadius: theme.spacing(3),
      backgroundColor: theme.palette.grey[200],
      [theme.breakpoints.up('sm')]: {
        margin: theme.spacing(0, 3),
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      zIndex: 1,
      justifyContent: 'center',
      color: theme.palette.text.secondary,
    },
    inputRoot: {
      width: '100%',
      color: 'inherit',
      borderRadius: theme.spacing(3),
    },
    inputInput: {
      width: '100%',
      borderRadius: 4,
      padding: theme.spacing(1.5, 1.5, 1.5, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    },
    button: {
      borderRadius: 8,
      whiteSpace: 'nowrap',
      textTransform: 'none',
      fontWeight: theme.typography.fontWeightBold,
    },
  })
);

interface EnhancedTableToolbarProps {
  // handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleFieldChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFilterFromChange: (date: Date | null) => void;
  handleFilterToChange: (date: Date | null) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleRefetch: () => Promise<ApolloQueryResult<TableDataQuery>>;
  handleReset: () => void;
  values: {
    field: string;
    filterFrom: Date | null;
    filterTo: Date | null;
  };
}

export default function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const [open, setOpen] = useState(false);
  const [openAddModal, setAddModal] = useState(false);
  const classes = useStyles();
  const {
    values,
    handleFieldChange,
    handleFilterFromChange,
    handleFilterToChange,
    handleRefetch,
    handleSubmit,
    handleReset,
  } = props;

  return (
    <Toolbar className={classes.root}>
      <Hidden xsDown>
        <Typography
          variant='h6'
          id='tableTitle'
          component='h3'
          style={{ whiteSpace: 'nowrap' }}
        >
          Your Links
        </Typography>
      </Hidden>
      <div className={classes.search}>
        <div className={classes.searchIcon}>
          <SearchIcon />
        </div>
        <InputBase
          disabled
          placeholder='Search…'
          inputProps={{ 'aria-label': 'search' }}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          // onChange={handleChange}
        />
      </div>
      <Box display='flex' alignItems='center'>
        <Button
          color='secondary'
          variant='contained'
          onClick={() => setAddModal(true)}
          className={classes.button}
        >
          Add link
        </Button>
        <Tooltip title='Reload'>
          <IconButton onClick={() => handleRefetch()}>
            <ReplayIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title='Filter list'>
          <IconButton onClick={() => setOpen(true)}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <Filter
        open={open}
        values={values}
        handleFieldChange={handleFieldChange}
        handleFilterFromChange={handleFilterFromChange}
        handleFilterToChange={handleFilterToChange}
        handleSubmit={handleSubmit}
        handleClose={() => {
          handleReset();
          setOpen(false);
        }}
      />
      <NewLinkModal
        open={openAddModal}
        handleClose={() => setAddModal(false)}
        handleRefetch={handleRefetch}
      />
    </Toolbar>
  );
}
