/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from 'react';

import { Container, Grid, makeStyles, Paper, Button, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import Pdf from '../../Components/pdfViewer/Pdf';

import MainWebcam from '../../Components/Webcam/MainWebcam';
import {
  getCurrentUser,
  setIdentityStatus,
  updateProctoring,
  setExam,
  setUserExamStatus
} from '../../redux/userReducer';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1)
  }
}));

const UseDashboard = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const exam = useSelector(state => state.user.examStatus);
  const classes = useStyles();

  useEffect(() => {
    // return () => dispatch(setExam(false));
  }, [exam]);

  // create a time interval for every 30 seconds to verify the user identity

  return (
    <Container>
      <Grid container spacing={1}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.root} elevation={1}>
              <MainWebcam />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper style={{ height: '89%' }} className={classes.root} elevation={1}>
              <Grid container direction="column" justifyContent="center" alignItems="center" spacing={1}>
                <Grid item xs={12}>
                  {!currentUser.identityStatus ? (
                    <Typography variant="h4" style={{ color: 'red' }} align="center">
                      You cannot start Exam because Your Identity is Not Verified 😢
                    </Typography>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => {
                        dispatch(setExam(!exam));
                      }}
                    >
                      {exam ? 'End Exam' : 'Start Exam'}
                    </Button>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h5" color="initial">
                    {currentUser.examStatus}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={12} sm={7}>
            {exam && currentUser.identityStatus ? <Pdf /> : null}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UseDashboard;
