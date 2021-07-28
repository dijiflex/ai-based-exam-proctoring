import React, { useEffect } from 'react';

import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import UseDashboard from './pages/userPage/UseDashboard';
import Admin from './pages/adminPage/admin';
import Homepage from './pages/homepage/Homepage';
import { getCurrentUser } from './redux/userReducer';
import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector(getCurrentUser);
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
