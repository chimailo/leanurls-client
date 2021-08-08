import { TableDataQuery } from '../../generated/graphql';

export type Order = 'asc' | 'desc';

export interface Data {
  id: string,
  alias: string,
  link: string,
  numberOfHits: string,
  createdAt: Date,
  lastHit: Date
}

export function createData(
  id: string,
  alias: string,
  link: string,
  numberOfHits: string,
  createdAt: Date,
  lastHit: Date
) {
  return { id, alias, link, numberOfHits, createdAt, lastHit }
}

export const getRows = (items: TableDataQuery["getTableData"]) =>
  items.map(item => {
    const { id, alias, link, numberOfHits, createdAt, lastHit } = item
    return createData(id, alias, link, numberOfHits, createdAt, lastHit)
  })

export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: Date | string }, b: { [key in Key]: Date | string }) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
