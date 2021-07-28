import { Button } from '@material-ui/core';
import React from 'react';
import { Link as RouterLink, useHistory, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { signInWithGoogle } from '../../firebase/firebaseUtils';

import { getCurrentUser } from '../../redux/userReducer';

const SignUp = () => {
  const currentUser = useSelector(getCurrentUser);

  const history = useHistory();
  const signIn = async () => {
    const { user } = await signInWithGoogle();
    history.push('/user');
  };
  return (
    <div>
      <Button
        size="medium"
        variant="outlined"
        color="secondary"
        align="center"
        startIcon={<img src="/icons/google.svg" height="20px" alt="Login with Google" />}
        onClick={signIn}
      >
        Sign In
      </Button>
    </div>
  );
};

export default SignUp;
