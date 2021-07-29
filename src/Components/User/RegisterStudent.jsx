/* eslint-disable react/no-array-index-key */
/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from 'react';
import { makeStyles, Grid, Button, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { useSelector, useDispatch } from 'react-redux';
import Link from '@material-ui/core/Link';
import { useForm, Form } from '../Controls/useForm';
import Controls from '../Controls/Controls';
import FileUploadInput from './FileUploadInput';

import db, { getUserGroups, registerStudent, trainGroup } from '../../firebase/firebaseUtils';
import { fetchUsers } from '../../redux/userReducer';

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
  const dispatch = useDispatch();
  const [userGroups, setuserGroups] = useState([]);
  useEffect(async () => {
    setuserGroups(await getUserGroups());
  }, []);
  const [showForm1, setShowForm1] = useState(true);
  const [fileInput, setFileInput] = useState([]);
  const [newStudentId, setnewStudentId] = useState(null);
  const addFileComponent = () => {
    setFileInput([...fileInput, '546546']);
  };

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
    await setnewStudentId(res);
    setShowForm1(false);
  };

  const handleFinish = async e => {
    e.preventDefault();
    dispatch(await fetchUsers());
    console.log(newStudentId);
    await trainGroup(newStudentId.groupId);
    setOpenPopup(false);
  };

  return (
    <Grid container spacing={0} justifyContent="center">
      <Grid xs={12} item sm={12}>
        {showForm1 ? (
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
        ) : (
          <Form className={classes.form} autoComplete="off">
            <div>
              {fileInput.map((input, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <FileUploadInput key={index} user={newStudentId} />
              ))}
            </div>
            <Button variant="outlined" onClick={addFileComponent} startIcon={<AddIcon />}>
              Add File
            </Button>
            <div className={classes.button}>
              <Button
                type="submit"
                name="accepted"
                variant="contained"
                size="medium"
                color="primary"
                onClick={handleFinish}
              >
                Finish and Train Model
              </Button>
            </div>
          </Form>
        )}
      </Grid>
    </Grid>
  );
};

export default RegisterStudet;
