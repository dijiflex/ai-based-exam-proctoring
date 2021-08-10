import React from 'react';
import { Snackbar, makeStyles } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useDispatch } from 'react-redux';
import { closeAlert } from '../../redux/notificationSlice';

const useStyles = makeStyles(theme => ({
  root: {
    // top: theme.spacing(9)
  }
}));

export default function Notification(props) {
  const dispatch = useDispatch();
  const { notify } = props;
  const classes = useStyles();

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(closeAlert());
  };

  return (
    <Snackbar
      className={classes.root}
      open={notify.isOpen}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      onClose={handleClose}
    >
      <Alert severity={notify.type} onClose={handleClose}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
}
