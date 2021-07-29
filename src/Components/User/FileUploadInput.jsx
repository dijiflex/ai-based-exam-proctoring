import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import firebase from 'firebase/app';
import db, { storage } from '../../firebase/firebaseUtils';

const FileUploadInput = ({ user }) => {
  const [progress, setProgress] = useState(0);
  const readImages = async e => {
    const file = e.target.files[0];
    const fileRef = storage.child(`students/${file.name}`).put(file);

    fileRef.on(
      'state_changed',
      snapshot => {
        setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      error => {
        // :TODO: Handle error
        console.log(error.message);
      },
      () => {
        fileRef.snapshot.ref.getDownloadURL().then(downloadURL => {
          const userRef = db.collection('users').doc(user);
          userRef.update({
            requiredFiles: firebase.firestore.FieldValue.arrayUnion(downloadURL)
          });
        });
      }
    );
  };
  return (
    <div style={{ marginTop: '5px' }}>
      <TextField type="file" name="title" variant="outlined" onChange={readImages} fullWidth required accept="*" />
      <LinearProgress styles={{ marginTop: '5px' }} variant="determinate" value={progress} />
    </div>
  );
};

export default FileUploadInput;
