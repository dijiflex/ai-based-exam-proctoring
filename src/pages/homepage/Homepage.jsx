import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import SignUp from '../../Components/signupForm/SignUp';

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: '100vh'
  },
  gbcolor: {
    backgroundColor: '#3F51B5'
  },
  title: {
    color: '#fff'
  }
}));

const homepage = () => {
  const classes = useStyles();
  return (
    <div className={classes.gbcolor}>
      <Container>
        <Grid className={classes.root} container direction="column" justifyContent="center" alignItems="center">
          <Grid item xs={12}>
            <Typography className={classes.title} variant="h2">
              AI Based Exam Proctoring System
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <SignUp />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default homepage;
