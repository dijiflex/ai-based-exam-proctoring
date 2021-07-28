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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = db.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email, photoURL } = userAuth;
    const createdAt = new Date().getTime();

    try {
      await userRef.set({
        fullName: displayName,
        email,
        createdAt,
        photo: photoURL,
        images: [],
        role: 'user',
        trained: 'false',
        ...additionalData
      });
    } catch (error) {
      //   console.log('error creating user', error.message);
    }
  }

  // eslint-disable-next-line consistent-return
  return userRef;
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

export const getUserGroups = async id => {
  const snapshot = db.collection('services').get();
  return (await snapshot).docs.map(doc => ({ id: doc.id, ...doc.data() }));
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

    console.log(res.data);
  } catch (error) {
    return error.response.data;
    // :TODO: Handle error
  }
};

export const getAllUsers = async () => {
  const snapshot = db.collection('users').get();
  return (await snapshot).docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export default db;
