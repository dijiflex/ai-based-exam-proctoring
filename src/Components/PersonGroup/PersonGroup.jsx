/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
import { Button, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { useForm, Form } from '../Controls/useForm';
import db from '../../firebase/firebaseUtils';
import Controls from '../Controls/Controls';

const initialFValues = {
  groupName: 'felix'
};

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
  }
}));

const PersonGroup = () => {
  const classes = useStyles();

  const validate = (fieldValues = values) => {
    const temp = { ...errors };

    if ('title' in fieldValues) temp.title = fieldValues.title ? '' : 'This field is required.';
    setErrors({
      ...temp
    });
    if (fieldValues === values) return Object.values(temp).every(x => x === '');
  };

  const { values, handleInputChange, errors, setErrors } = useForm(initialFValues, true, validate);

  // Handle submitsta
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const newJobGroup = await db.collection('personGroups').add({
        groupName: values.groupName
      });
    } catch (error) {
      // :TODO: Handle error
    }
  };
  return (
    <Paper className={classes.root} elevation={1}>
      <Form className={classes.form} autoComplete="off" onSubmit={handleSubmit}>
        <Controls.Input
          name="groupName"
          onChange={handleInputChange}
          placeholder="e.g Your preferred name for this task"
          value={values.groupName}
          fullWidth
          label="Title"
          required
        />
        <Button type="submit" name="submitButton" variant="contained" size="medium" color="primary">
          Register Group
        </Button>
      </Form>
    </Paper>
  );
};

export default PersonGroup;
