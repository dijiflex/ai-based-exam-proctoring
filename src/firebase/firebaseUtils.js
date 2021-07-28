import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

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
        requiredFields: [],
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

export const getUserRef = async userAuth => {
  if (!userAuth) return;

  const userRef = db.doc(`users/${userAuth.uid}`);

  // eslint-disable-next-line consistent-return
  return userRef;
};

export const getAllServices = async () => {
  const snapshot = db.collection('services').get();
  return (await snapshot).docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
export const getAllMyJobs = async userId => {
  const snapshot = db.collection('jobs').where('user.id', '==', `${userId}`).get();
  return (await snapshot).docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getAllAgents = async () => {
  const verified = db.collection('users').where('role', '==', 'agent').get();
  const pending = db.collection('users').where('role', '==', 'pendingAgent').get();
  const [verifiedAgents, unverfiedAgents] = await Promise.all([verified, pending]);

  const verifieddocs = verifiedAgents.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  const unverifieddocs = unverfiedAgents.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return [...verifieddocs, ...unverifieddocs];
};

export const getAllUsers = async () => {
  const snapshot = db.collection('users').get();
  return (await snapshot).docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getAllJobs = async () => {
  const snapshot = db.collection('jobs').get();
  return (await snapshot).docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const createTask = async () => {
  return 1556654;
};

export default db;
