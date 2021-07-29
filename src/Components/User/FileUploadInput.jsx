import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import firebase from 'firebase/app';
import db, { addFaces, storage } from '../../firebase/firebaseUtils';

const FileUploadInput = ({ user }) => {
  const { groupId, personId } = user;
  const [progress, setProgress] = useState(0);
  const [downloadUrl, setDownloadUrl] = useState(null);

  useEffect(() => {
    // console.log(`the now download url is ${downloadUrl}`);
  }, [downloadUrl]);
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
        // console.log(error.message);
      },
      async () => {
        fileRef.snapshot.ref.getDownloadURL().then(downloadURL => {
          const userRef = db.collection('users').doc(user.user);
          //   console.log(`the download url is ${downloadURL}`);
          setDownloadUrl(downloadURL);
          userRef.update({
            images: firebase.firestore.FieldValue.arrayUnion({ downloadURL, name: file.name })
          });
          addFaces(downloadURL, groupId, personId)
            .then(() => {
              //   console.log('the update is complete');
            })
            .catch(error => {
              //   console.log('update failed');
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
