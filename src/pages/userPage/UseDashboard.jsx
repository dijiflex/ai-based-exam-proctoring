/* eslint-disable no-unused-expressions */
import React from 'react';

import { Container, Grid, Paper } from '@material-ui/core';
import PersonGroup from '../../Components/PersonGroup/PersonGroup';
import Pdf from '../../Components/pdfViewer/Pdf';

import MainWebcam from '../../Components/Webcam/MainWebcam';

const UseDashboard = () => {
  return (
    <Container>
      <Grid container spacing={1}>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={1}>
              <MainWebcam />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper style={{ height: '100%' }} elevation={1}>
              this is a page
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs={12} sm={7}>
            <Pdf />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UseDashboard;
