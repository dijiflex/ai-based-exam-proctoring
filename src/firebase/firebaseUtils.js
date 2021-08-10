/* eslint-disable consistent-return */
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import api from '../utils/apiKeys';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBggRzOr2KAPFVWps2MqEXK0KyuLXy4mPc',
  authDomain: 'ai-based-exam-proctoring.firebaseapp.com',
  projectId: 'ai-based-exam-proctoring',
  storageBucket: 'ai-based-exam-proctoring.appspot.com',
  messagingSenderId: '643607721471',
  appId: '1:643607721471:web:d91452c97bb23fce8323ca'
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
const db = firebaseApp.firestore();
export const storage = firebaseApp.storage().ref();

export const getUserByEmail = async email => {
  const snapshot = db.collection('users').where('email', '==', `${email}`).get();
  return (await snapshot).docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  let userRef = db.doc(`users/${userAuth.uid}`);
  const { email } = userAuth;

  const snapShot = await userRef.get();

  // check if the email address is already in the database
  const res = await getUserByEmail(email);
  if (res.length > 0) {
    userRef = db.doc(`users/${res[0].id}`);
  } else {
    return null;
  }

  if (!snapShot.exists) {
    const { displayName, photoURL } = userAuth;
    const createdAt = new Date().getTime();

    try {
      await userRef.update({
        createdAt,
        photo: photoURL,
        role: 'user',
        ...additionalData
      });
    } catch (error) {
      //   console.log('error creating user', error.message);
    }
  }

  // eslint-disable-next-line consistent-return
  return userRef;
};

export const registerStudent = async values => {
  try {
    const personRes = await axios.post(
      `${api.endpoint}/face/v1.0/persongroups/${values.personGroupId}/persons`,
      {
        name: values.fullName,
        userData: values.email
      },
      {
        headers: { 'Content-Type': 'application/json', 'Ocp-Apim-Subscription-Key': api.key }
      }
    );

    const { personId } = personRes.data;
    const res = await db.collection('users').add({
      fullName: values.fullName,
      personId,
      groupId: values.personGroupId,
      email: values.email,
      createdAt: new Date().getTime(),
      photo: '',
      images: [],
      role: 'user',
      trained: 'false'
    });

    return { user: res.id, personId, groupId: values.personGroupId };
  } catch (error) {
    // console.log(error.message);
  }
};

export const getUserRef = async userAuth => {
  if (!userAuth) return;

  const userRef = db.doc(`users/${userAuth.uid}`);

  // eslint-disable-next-line consistent-return
  return userRef;
};

export const getAllGroups = async () => {
  const snapshot = db.collection('personGroups').get();
  return (await snapshot).docs.map(doc => ({ uid: doc.id, ...doc.data() }));
};

export const getUserGroups = async () => {
  const snapshot = db.collection('personGroups').get();
  return (await snapshot).docs.map(doc => ({ ...doc.data() }));
};

export const createUserGroups = async values => {
  try {
    const id = uuid();
    const res = await axios.put(
      `${api.endpoint}/face/v1.0/persongroups/${id}`,
      {
        name: values.groupName,
        recognitionModel: 'recognition_04'
      },
      {
        headers: { 'Content-Type': 'application/json', 'Ocp-Apim-Subscription-Key': api.key }
      }
    );
    await db.collection('personGroups').add({
      groupName: values.groupName,
      id
    });

    // console.log(res.data);
  } catch (error) {
    return error.response.data;
    // :TODO: Handle error
  }
};

export const getAllUsers = async () => {
  const snapshot = db.collection('users').get();
  return (await snapshot).docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const trainGroup = async groupId => {
  try {
    await axios.post(
      `${api.endpoint}face/v1.0/persongroups/${groupId}/train`,
      {},
      {
        headers: { 'Content-Type': 'application/json', 'Ocp-Apim-Subscription-Key': api.key }
      }
    );
  } catch (error) {
    console.log(error.response.data);
  }
};

export const addFaces = async (url, groupId, personId) => {
  await axios.post(
    `${api.endpoint}/face/v1.0/persongroups/${groupId}/persons/${personId}/persistedFaces`,
    {
      url
    },
    {
      headers: { 'Content-Type': 'application/json', 'Ocp-Apim-Subscription-Key': api.key }
    }
  );
};

export const deleteUser = async id => {
  const snapshot = await db.collection('users').doc(id).get();
  const user = await snapshot.data();

  console.log(user);
  try {
    await axios.delete(`${api.endpoint}/face/v1.0/persongroups/${user.groupId}/persons/${user.personId}`, {
      headers: { 'Content-Type': 'application/json', 'Ocp-Apim-Subscription-Key': api.key }
    });

    if (user.images > 0) {
      user.images.forEach(image => {
        // Create a reference to the file to delete
        const desertRef = storage.child(`students/${image.name}`);

        // Delete the file
        desertRef
          .delete()
          .then(() => {
            // File deleted successfully
            console.log('the file hasd been deleted');
          })
          .catch(error => {
            // Uh-oh, an error occurred!
            console.log('Deletion failed');
          });
      });
    }

    await db
      .collection('users')
      .doc(id)
      .delete()
      .then(() => {
        console.log('deleted');
      })
      .catch(error => {
        // console.error('Error removing document: ', error);
      });
  } catch (error) {
    if (error.response) {
      //   console.log(error.response.data);
      //   console.log(error.response.status);
    }
  }
};

export const detectUser = async buff => {
  const res = await axios.post(`${api.endpoint}/face/v1.0/detect?recognitionModel=recognition_04`, buff, {
    headers: { 'Content-Type': 'application/octet-stream', 'Ocp-Apim-Subscription-Key': api.key }
  });

  return res.data;
};

export const verifyUser = async data => {
  try {
    const res = await axios.post(`${api.endpoint}/face/v1.0/verify`, data, {
      headers: { 'Content-Type': 'application/json', 'Ocp-Apim-Subscription-Key': api.key }
    });
    return res.data;
  } catch (error) {
    // console.log(error.response.data);
  }
};

export const detectAndVerifyUser = async buff => {
  console.log('I am detecting and verifying the user after every 1 mins');
};

export default db;
