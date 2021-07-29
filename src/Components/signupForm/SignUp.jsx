import { Button, makeStyles } from '@material-ui/core';
import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';

import { signInWithGoogle } from '../../firebase/firebaseUtils';

const useStyles = makeStyles(theme => ({
  root: {
    borderColor: '#fff',
    margin: theme.spacing(1)
  }
}));

const SignUp = () => {
  const classes = useStyles();

  const history = useHistory();
  const signIn = async () => {
    const { user } = await signInWithGoogle();
    history.push('/user');
  };
  return (
    <div>
      <Button
        size="large"
        className={classes.root}
        variant="outlined"
        style={{ color: '#fff' }}
        align="center"
        startIcon={<img src="/icons/google.svg" height="20px" alt="Login with Google" />}
        onClick={signIn}
      >
        Sign In With Google
      </Button>
    </div>
  );
};

export default SignUp;
