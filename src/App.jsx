import React, { useEffect } from 'react';

import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UseDashboard from './pages/userPage/UseDashboard';
import Admin from './pages/adminPage/admin';
import Homepage from './pages/homepage/Homepage';
import { getCurrentUser, setUser } from './redux/userReducer';
import ProtectedRoute from './Components/ProtectedRoute';
import UserPage from './pages/userPage/userPage';
import { auth, createUserProfileDocument } from './firebase/firebaseUtils';
import Notification from './Components/Controls/Notifications';
import { setAlert } from './redux/notificationSlice';

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
  const alert = useSelector(state => state.notification.alert);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const userRef = await createUserProfileDocument(user);

        if (!userRef) {
          dispatch(setAlert({ message: 'You must be registered by an Admin to Login', type: 'error' }));
          return;
        }
        userRef.onSnapshot(snapshot => {
          const doc = snapshot.data();
          dispatch(
            setUser({
              id: snapshot.id,
              identityStatus: false,
              examStatus: '',
              ...doc
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
      <div>
        <Switch>
          <Route exact path="/">
            {currentUser ? <Redirect to="/user" /> : <Homepage />}
          </Route>
          <ProtectedRoute path="/admin" userRole={['admin']} component={Admin} />
          <ProtectedRoute path="/user" component={UserPage} />
        </Switch>
        <Notification notify={alert} />
      </div>
    </Router>
  );
}

export default App;
