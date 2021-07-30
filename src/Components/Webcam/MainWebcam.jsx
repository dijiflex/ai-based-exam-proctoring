/* eslint-disable no-unused-expressions */
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import Button from '@material-ui/core/Button';
import axios from 'axios';

import { useSelector } from 'react-redux';
import PersonGroup from '../PersonGroup/PersonGroup';
import api from '../../utils/apiKeys';
import { detectAndVerifyUser, detectUser, verifyUser } from '../../firebase/firebaseUtils';
import { getCurrentUser } from '../../redux/userReducer';

const videoConstraints = {
  width: 0,
  height: 0,
  facingMode: 'user'
};
const MainWebcam = () => {
  const currentUser = useSelector(getCurrentUser);
  const webcamRef = useRef(null);
  const [imageData, setImageData] = useState(null);

  useEffect(async () => {
    await detectAndVerifyUser();
  }, []);

  const sendData = async data => {
    const buff = Buffer.from(data.split(',')[1], 'base64');
    const res = await detectUser(buff);
    // console.log(res);
    if (res.length === 1) {
      const faceData = {
        faceId: res[0].faceId,
        personId: currentUser.personId,
        personGroupId: currentUser.groupId
      };

      const verify = await verifyUser(faceData);

      console.log(verify);
    } else if (res.length > 1) {
      console.log('Multiple faces detected');
    } else {
      console.log('No user Detected');
    }
  };
  const capture = React.useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    await sendData(imageSrc);
  }, [webcamRef]);
  return (
    <div
      style={{
        overflow: 'hidden'
      }}
    >
      <Webcam
        screenshotFormat="image/JPEG"
        onUserMediaError={err => console.log('Access to Camera Denied')}
        onUserMedia={() => console.log('Access to Camera Granted')}
        ref={webcamRef}
        videoConstraints={videoConstraints}
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
    </div>
  );
};

export default MainWebcam;
