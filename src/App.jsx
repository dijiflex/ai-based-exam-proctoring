import React, { useEffect } from 'react';

import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UseDashboard from './pages/userPage/UseDashboard';
import Admin from './pages/adminPage/admin';
import Homepage from './pages/homepage/Homepage';
import { getCurrentUser, setUser } from './redux/userReducer';
import ProtectedRoute from './Components/ProtectedRoute';
import { auth, createUserProfileDocument } from './firebase/firebaseUtils';

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const userRef = await createUserProfileDocument(user);

        if (!userRef) return;
        userRef.onSnapshot(snapshot => {
          const doc = snapshot.data();
          dispatch(
            setUser({
              id: snapshot.id,
              email: doc.email,
              fullName: doc.fullName,
              photo: doc.photo,
              phoneNumber: doc.phoneNumber,
              referals: doc.referals,
              username: doc.username,
              profileStatus: doc.profileStatus
            })
          );
        });
      } else {
        dispatch(setUser(null));
      }
    });
    return unsubscribe;
  }, [dispatch]);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {currentUser ? <Redirect to="/user" /> : <Homepage />}
        </Route>
        <ProtectedRoute path="/user" component={Admin} />
      </Switch>
    </Router>
  );
}

export default App;
