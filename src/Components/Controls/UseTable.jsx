/* eslint-disable no-shadow */
/* eslint-disable react/destructuring-assignment */
import React, { useState } from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const useStyles = makeStyles(theme => ({
  table: {
    marginTop: theme.spacing(0),
    '& thead tr th': {
      fontWeight: 600,
      color: theme.palette.primary.main,
      background: theme.palette.primary.light
    },
    '& tboyd td': {
      fontWeight: 300
    },
    '& tbody tr:hover': {
      backgroundColor: '#f5f5f5'
    }
  }
}));

const UseTable = (records, headCells) => {
  const classes = useStyles();

  const pages = [5, 10, 50, 100];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setrowsPerPage] = useState(pages[0]);
  // create state for set order
  const [order, setOrder] = useState();
  // create state for setOrderBy
  const [orderBy, setOrderBy] = useState();

  const TblContainer = props => <Table className={classes.table}>{props.children}</Table>;
  const TblHead = () => {
    const handleSortRequest = cellId => {
      const isAsc = orderBy === cellId && order === 'asc';
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(cellId);
    };
    return (
      <TableHead>
        <TableRow>
          {headCells.map(cell => (
            <TableCell key={cell.id} sortDirection={orderBy === cell.id ? order : false}>
              {cell.disableSorting ? (
                cell.label
              ) : (
                <TableSortLabel
                  active={orderBy === cell.id}
                  direction={orderBy === cell.id ? order : 'asc'}
                  onClick={() => {
                    handleSortRequest(cell.id);
                  }}
                >
                  {cell.label}
                </TableSortLabel>
              )}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const handleChangePage = newPage => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setrowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const TblPagination = () => (
    <TablePagination
      page={page}
      rowsPerPageOptions={pages}
      rowsPerPage={rowsPerPage}
      component="div"
      count={records.length}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
  }

  const recordsAfterPagingAndSorting = () => {
    return stableSort(records, getComparator(order, orderBy)).slice(page * rowsPerPage, (page + 1) * rowsPerPage);
  };
  return {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting
  };
};

export default UseTable;
