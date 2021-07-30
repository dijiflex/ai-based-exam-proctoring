/* eslint-disable no-unused-expressions */
import React, { useState } from 'react';

import { Container, Grid, makeStyles, Paper, Button, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';
import Pdf from '../../Components/pdfViewer/Pdf';

import MainWebcam from '../../Components/Webcam/MainWebcam';
import { getCurrentUser } from '../../redux/userReducer';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1)
  }
}));

const UseDashboard = () => {
  const currentUser = useSelector(getCurrentUser);
  const classes = useStyles();
  const [exam, setExam] = useState(false);
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
                    'You cannot start Exam Beause Your Identity is Not Verified'
                  ) : (
                    <Button variant="contained" color="primary" onClick={() => setExam(!exam)}>
                      {exam ? 'End Exam' : 'Start Exam'}
                    </Button>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h4" color="initial">
                    {currentUser.examStatus}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={12} sm={7}>
            {exam ? <Pdf /> : null}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UseDashboard;
