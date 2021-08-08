import React from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import Hidden from '@material-ui/core/Hidden';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Order, Data } from './utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableCell: {
      fontSize: 13,
    },
    link: {
      minWidth: 200,
      width: '55%',
      [theme.breakpoints.down('xs')]: {
        width: '100%',
      },
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
    },
  })
);

interface HeadCell {
  id: keyof Data;
  label: string;
}

const headCells: HeadCell[] = [
  { id: 'createdAt', label: 'Created' },
  { id: 'numberOfHits', label: 'Hits' },
  { id: 'lastHit', label: 'Last Hit' },
];

interface TableHeadProps {
  order: Order;
  orderBy: string;
  styles: any;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
}

export default function EnhancedTableHead(props: TableHeadProps) {
  const classes = useStyles();
  const { styles, onRequestSort, orderBy, order } = props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='none' className={classes.link} />
        <Hidden xsDown>
          {headCells.map((headCell) => (
            <TableCell
              // padding='none'
              align='center'
              key={headCell.id}
              sortDirection={orderBy === headCell.id ? order : false}
              className={`${classes.tableCell} ${
                headCell.id === 'numberOfHits' ? classes.hits : classes.dates
              }`}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
                IconComponent={ArrowDropDownIcon}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={styles.visuallyHidden}>
                    {order === 'desc'
                      ? 'sorted descending'
                      : 'sorted ascending'}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </Hidden>
        <TableCell padding='none' className={classes.buttons} />
      </TableRow>
    </TableHead>
  );
}
