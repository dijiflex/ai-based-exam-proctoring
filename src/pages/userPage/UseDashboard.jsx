/* eslint-disable no-unused-expressions */
import React from 'react';

import { Container, Grid } from '@material-ui/core';
import PersonGroup from '../../Components/PersonGroup/PersonGroup';

import MainWebcam from '../../Components/Webcam/MainWebcam';

const UseDashboard = () => {
  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <MainWebcam />
        </Grid>
        <Grid item xs={12} sm={6}>
          this is the test page
        </Grid>
      </Grid>
    </Container>
  );
};

export default UseDashboard;
