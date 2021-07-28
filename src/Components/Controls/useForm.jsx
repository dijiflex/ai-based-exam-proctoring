import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';

export const useForm = (initialFValues, validateOnChange = false, validate) => {
  const [values, setValues] = useState(initialFValues);
  const [errors, setErrors] = useState({});

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    if (validateOnChange) validate({ [name]: value });
  };
  const resetForm = () => {
    setValues(initialFValues);
    setErrors({});
  };

  return {
    resetForm,
    values,
    setValues,
    handleInputChange,
    errors,
    setErrors
  };
};

const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiFormControl-root': {
      width: '80%',
      margin: theme.spacing(1)
    }
  }
}));

export const Form = ({ children, ...other }) => {
  const classes = useStyles();
  return (
    <form className={classes.root} autoComplete="off" {...other}>
      {children}
    </form>
  );
};
