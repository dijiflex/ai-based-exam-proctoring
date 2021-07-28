/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles, Grid, Button, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import Link from '@material-ui/core/Link';
import { useForm, Form } from '../Controls/useForm';
import Controls from '../Controls/Controls';

import db, { getUserGroups, registerStudent } from '../../firebase/firebaseUtils';

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1)
  },
  form: {
    '& > *': {
      marginTop: theme.spacing(1),
      width: '100%'
    }
  },
  button: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  link: {
    cursor: 'pointer'
  },
  requiredFiles: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const RegisterStudet = ({ currentItem, setOpenPopup }) => {
  const classes = useStyles();
  const [userGroups, setuserGroups] = useState([]);
  useEffect(async () => {
    setuserGroups(await getUserGroups());
  }, []);

  const initialFValues = {
    fullName: '',
    email: '',
    personGroupId: '',
    role: '',
    agentRole: '',
    message: ''
  };

  const validate = (fieldValues = values) => {
    const temp = { ...errors };

    if ('fullName' in fieldValues) temp.fullName = fieldValues.fullName ? '' : 'This field is required.';
    if ('mainCategory' in fieldValues)
      temp.mainCategory = fieldValues.mainCategory.length !== 0 ? '' : 'This field is required.';
    if ('email' in fieldValues) temp.email = /$^|.+@.+..+/.test(fieldValues.email) ? '' : 'Email is not valid.';
    setErrors({
      ...temp
    });
    if (fieldValues === values) return Object.values(temp).every(x => x === '');
  };

  const { values, handleInputChange, setValues, errors, setErrors } = useForm(initialFValues, true, validate);

  // Handle submitsta
  const handleRegister = async e => {
    e.preventDefault();
    const res = await registerStudent(values);
    console.log(res);
    setOpenPopup(false);
  };

  return (
    <Grid container spacing={0} justifyContent="center">
      <Grid xs={12} item sm={12}>
        <Form className={classes.form} autoComplete="off">
          <Controls.Select
            name="personGroupId"
            label="User Group"
            value={values.personGroupId}
            onChange={handleInputChange}
            options={userGroups.map(item => ({ id: item.id, title: item.groupName }))}
          />
          <Controls.Input
            name="fullName"
            onChange={handleInputChange}
            placeholder="e.g Enter student Name"
            value={values.fullName}
            fullWidth
            label="Student FullName"
            required
          />
          <Controls.Input
            name="email"
            onChange={handleInputChange}
            placeholder="Student Email"
            value={values.email}
            fullWidth
            label="Email"
            error={errors.email}
            required
          />
          <div className={classes.button}>
            <Button
              type="submit"
              name="accepted"
              variant="contained"
              size="medium"
              color="primary"
              onClick={handleRegister}
            >
              Register
            </Button>
          </div>
        </Form>
      </Grid>
    </Grid>
  );
};

export default RegisterStudet;
