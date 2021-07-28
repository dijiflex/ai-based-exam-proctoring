import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { Button, makeStyles, Paper, TableBody, TableCell, TableRow } from '@material-ui/core';
import { fetchUsers, getCurrentUser } from '../../redux/userReducer';
import UseTable from '../Controls/UseTable';
import Popup from '../Controls/Popup';
import EditAgent from './RegisterStudent';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    overflowX: 'auto',
    marginTop: theme.spacing(2)
  },
  pending: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover': {
      color: theme.palette.primary.main
    }
  },
  quoted: {
    backgroundColor: '#0063cc'
  },
  inprogress: {
    backgroundColor: '#0063cc'
  },
  finished: {
    backgroundColor: '#0063cc'
  }
}));

const headCells = [
  {
    id: 'no',
    label: 'No',
    width: '70'
  },
  {
    id: 'Name',
    label: 'Name'
  },
  {
    id: 'email',
    label: 'Email'
  },
  {
    id: 'role',
    label: 'Role'
  },
  {
    id: 'status',
    label: 'Status'
  },
  {
    id: 'Action',
    label: 'Action',
    disableSorting: true
  }
];

const AllUser = () => {
  const [openPopup, setOpenPopup] = useState(false);
  const currentUser = useSelector(getCurrentUser);
  const allUsers = useSelector(state => state.user.allUsers.data);
  const clasess = useStyles();
  const dispatch = useDispatch();
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = UseTable(allUsers, headCells);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);
  return (
    <>
      <Grid container spacing={1} direction="column">
        <Grid item>
          <Button variant="contained" onClick={() => setOpenPopup(true)} color="primary">
            Register Student
          </Button>
        </Grid>
        <Grid item>
          <Paper className={clasess.root}>
            <TblContainer>
              <TblHead />
              <TableBody>
                {allUsers.map((share, i) => (
                  <TableRow key={share.id}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{share.fullName}</TableCell>
                    <TableCell>{share.email}</TableCell>
                    <TableCell>{share.role}</TableCell>
                    <TableCell>{share.trained}</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TblContainer>
            <TblPagination />
          </Paper>
        </Grid>
      </Grid>
      <Popup openPopup={openPopup} setOpenPopup={setOpenPopup} title="Edit Agent">
        <EditAgent setOpenPopup={setOpenPopup} />
      </Popup>
    </>
  );
};

export default AllUser;
