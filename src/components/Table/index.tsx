import React, { useEffect, useState } from 'react';
import copy from 'copy-to-clipboard';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Paper from '@material-ui/core/Paper';
import Skeleton from '@material-ui/lab/Skeleton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { format, formatDistanceToNow } from 'date-fns';

import DeleteMenu from '../menus/delete';
import EnhancedTableHead from './TableHead';
import EnhancedTableToolbar from './TableToolbar';
import ErrorReload from '../Reload';
import { ITEMS_PER_PAGE } from '../../lib/constants';
import { Order, Data, getRows, stableSort, getComparator } from './utils';
import {
  useDeleteLinkMutation,
  useTableDataQuery,
} from '../../generated/graphql';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: '100%',
    },
    table: {
      tableLayout: 'fixed',
    },
    tableRow: {
      '&:hover $buttons': {
        opacity: 1,
      },
    },
    link: {
      minWidth: 200,
      width: '55%',
    },
    dates: {
      width: '17%',
    },
    hits: {
      width: '11%',
    },
    buttons: {
      width: 88,
      minWidth: 88,
      opacity: 0,
      transition: theme.transitions.create('opacity'),
    },
    text: {
      fontSize: 13,
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
    loadMore: {
      textTransform: 'capitalize',
    },
  })
);

interface EnhancedTableProps {
  totalItems: number;
}

export default function EnhancedTable({ totalItems }: EnhancedTableProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [field, setField] = useState('createdAt');
  const [filterFrom, setFilterFrom] = useState<Date | null>(null);
  const [filterTo, setFilterTo] = useState<Date | null>(new Date());
  const [isCopied, setCopied] = useState(false);
  const [order, setOrder] = useState<Order>('desc');
  const [orderBy, setOrderBy] = useState<keyof Data>('createdAt');
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<ReturnType<typeof getRows>>([]);
  const [searchText, setSearchText] = useState('');

  const classes = useStyles();
  const { data, loading, error, fetchMore, refetch } = useTableDataQuery({
    notifyOnNetworkStatusChange: true,
    variables: { limit: ITEMS_PER_PAGE },
    onCompleted: (data) => setRows(getRows(data.getTableData)),
  });
  const [deleteLink] = useDeleteLinkMutation();

  useEffect(() => {
    setTimeout(() => {
      setCopied(false);
    }, 8000);
  }, [isCopied]);

  const copyToClipboard = (url: string) => {
    copy(url);
    setCopied(true);
  };

  const handleLoadMore = async () => {
    const currentLength = data?.getTableData.length || 0;
    const { data: newPage } = await fetchMore({
      variables: { offset: currentLength },
    });
    // @ts-expect-error
    setRows(newPage.getTableData);
    setPage(page + 1);
  };

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearchText(e.target.value)
  //   const matches = rows.filter(row => {
  //     const regex = new RegExp(`^${searchText}`, 'gi')
  //     // const urlRegex = new RegExp(`(http|https):\\/\\/|\\/|\\?|&|=`, 'gi')
  //     // const result = row.link.split(urlRegex)
  //     return row.alias.match(regex)
  //   })
  //   setRows(matches)

  //   if (!searchText) setRows(data?.getTableData)
  // }

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setField(e.target.value);
  const handleFilterFromChange = (date: Date | null) => setFilterFrom(date);
  const handleFilterToChange = (date: Date | null) => setFilterTo(date);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await refetch({
      filter: {
        field,
        from: filterFrom?.toISOString(),
        to: filterTo?.toISOString(),
      },
    });
  };

  const handleReset = () => {
    setField('');
    setFilterFrom(null);
    setFilterTo(new Date());
  };

  const handleRowDelete = async (id: string) => {
    const res = await deleteLink({ variables: { id } });
    res && setRows(rows.filter((row) => row.id !== id));
  };

  const handleDisable = async (id: string) => {};

  if (error) {
    return <ErrorReload error={error} />;
  }

  return (
    <Paper elevation={0} className={classes.paper}>
      <EnhancedTableToolbar
        // handleChange={handleSearchTextChange}
        values={{ field, filterFrom, filterTo }}
        handleFieldChange={handleFieldChange}
        handleFilterFromChange={handleFilterFromChange}
        handleFilterToChange={handleFilterToChange}
        handleSubmit={handleSubmit}
        handleReset={handleReset}
        handleRefetch={async () => refetch()}
      />
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby='tableTitle'
          size='medium'
          aria-label='enhanced table'
        >
          {rows.length > 0 ? (
            <>
              <EnhancedTableHead
                styles={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy)).map((row) => (
                  <TableRow
                    tabIndex={-1}
                    key={row.id}
                    className={classes.tableRow}
                  >
                    <TableCell
                      component='th'
                      id={`table-row-${row.alias}`}
                      scope='item'
                      className={classes.link}
                    >
                      <Box display='flex' flexDirection='column'>
                        <Typography
                          noWrap
                          color='secondary'
                          variant='subtitle2'
                          component='span'
                          style={{ fontWeight: 500 }}
                        >
                          {loading ? (
                            <Skeleton />
                          ) : (
                            `${process.env.NEXT_PUBLIC_HOST_URL}${row.alias}`
                          )}
                        </Typography>
                        <Typography
                          noWrap
                          color='textSecondary'
                          variant='body2'
                          component='span'
                        >
                          {loading ? <Skeleton /> : row.link}
                        </Typography>
                      </Box>
                    </TableCell>
                    <Hidden xsDown>
                      <TableCell align='center' className={classes.dates}>
                        <Typography noWrap className={classes.text}>
                          {loading ? (
                            <Skeleton />
                          ) : (
                            format(new Date(row.createdAt), 'dd/MM/yyyy')
                          )}
                        </Typography>
                      </TableCell>
                      <TableCell align='center' className={classes.dates}>
                        <Typography noWrap className={classes.text}>
                          {loading ? (
                            <Skeleton />
                          ) : parseInt(row.numberOfHits) < 1 ? (
                            '0'
                          ) : (
                            row.numberOfHits
                          )}
                        </Typography>
                      </TableCell>
                      <TableCell align='center' className={classes.hits}>
                        <Typography noWrap className={classes.text}>
                          {loading ? (
                            <Skeleton />
                          ) : row.lastHit === null ? (
                            '-'
                          ) : (
                            `${formatDistanceToNow(new Date(row.lastHit))} ago`
                          )}
                        </Typography>
                      </TableCell>
                    </Hidden>
                    <TableCell padding='none' className={classes.buttons}>
                      <Tooltip title='copy link'>
                        {isCopied ? (
                          <Typography
                            variant='body2'
                            component='span'
                            color='secondary'
                          >
                            <small>copied</small>
                          </Typography>
                        ) : (
                          <IconButton
                            aria-label='copy link to clipboard'
                            onClick={() =>
                              copyToClipboard(
                                `${process.env.NEXT_PUBLIC_HOST_URL}_/${row.alias}`
                              )
                            }
                          >
                            <FileCopyOutlinedIcon fontSize='small' />
                          </IconButton>
                        )}
                      </Tooltip>
                      <Tooltip title='view more options'>
                        <IconButton
                          aria-controls='view more options'
                          aria-haspopup='true'
                          aria-label='view more options'
                          onClick={(
                            event: React.MouseEvent<HTMLButtonElement>
                          ) => setAnchorEl(event.currentTarget)}
                        >
                          <MoreVertIcon fontSize='small' />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                    <DeleteMenu
                      anchorEl={anchorEl}
                      handleClose={() => setAnchorEl(null)}
                      handleDelete={() => handleRowDelete(row.id)}
                      handleDisable={() => handleDisable(row.id)}
                    />
                  </TableRow>
                ))}
              </TableBody>
            </>
          ) : (
            <Typography
              align='center'
              variant='subtitle2'
              color='textSecondary'
            >
              You haven't created any links yet, click the add link button to
              create one.
            </Typography>
          )}
        </Table>
      </TableContainer>
      {Math.ceil(totalItems / ITEMS_PER_PAGE) > page && (
        <Button
          fullWidth
          color='secondary'
          size='large'
          aria-label='Load more'
          className={classes.loadMore}
          onClick={handleLoadMore}
        >
          Load More
        </Button>
      )}
    </Paper>
  );
}
