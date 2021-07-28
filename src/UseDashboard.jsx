/* eslint-disable no-unused-expressions */
import React, { useRef, useEffect, useState } from 'react';
import Webcam from 'react-webcam';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import { Buffers } from '@react-frontend-developer/buffers';
import { Container, Grid } from '@material-ui/core';
import PersonGroup from './Components/PersonGroup/PersonGroup';
import api from './utils/apiKeys';

const UseDashboard = () => {
  const webcamRef = useRef(null);
  const [imageData, setImageData] = useState(null);

  const sendData = async data => {
    const buff = Buffer.from(data.split(',')[1], 'base64');
    const res = await axios.post(
      `${api.endpoint}/face/v1.0/detect?
        returnFaceLandmarks=false
        &returnFaceAttributes=age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories
        &recognitionModel=recognition_04
        &faceIdTimeToLive=60`,
      buff,
      {
        headers: { 'Content-Type': 'application/octet-stream', 'Ocp-Apim-Subscription-Key': api.key }
      }
    );

    console.log(res.data);
  };
  const capture = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    await sendData(imageSrc);
  }, [webcamRef]);

  return (
    <Container>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={6}>
          <Webcam
            screenshotFormat="image/JPEG"
            ref={webcamRef}
            style={{
              marginLeft: 'auto',
              marginRight: 'auto',
              left: 0,
              right: 0,
              textAlign: 'center',
              zindex: 9
            }}
          />
          <br />
          <Button variant="contained" color="default" onClick={capture}>
            Capture
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <PersonGroup />
        </Grid>
      </Grid>
    </Container>
  );
};

export default UseDashboard;
