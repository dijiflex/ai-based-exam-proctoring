/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
import { Button, makeStyles, Paper, Grid, Typography, List, ListItem, ListItemText } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { useForm, Form } from '../Controls/useForm';
import db, { createUserGroups, getAllGroups } from '../../firebase/firebaseUtils';
import Controls from '../Controls/Controls';

const initialFValues = {
  groupName: ''
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
  },
  width: {
    width: '100%'
  }
}));

const PersonGroup = () => {
  const classes = useStyles();
  const [groups, setgroups] = useState([]);
  useEffect(async () => {
    setgroups(await getAllGroups());
  }, []);

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
      await createUserGroups(values);
      setgroups(await getAllGroups());
    } catch (error) {
      console.log(error.response.data);
      // :TODO: Handle error
    }
  };
  return (
    <Grid container spacing={1} direction="column" alignItems="center">
      <Grid item sm={12} md={6}>
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
      </Grid>
      <Grid item xs={12} className={classes.width} md={12}>
        <Paper className={classes.root} elevation={1}>
          <Typography variant="h6" className={classes.title}>
            All Groups
          </Typography>
          <div className={classes.demo}>
            <List>
              {groups.map(group => (
                <ListItem key={group.id}>
                  <ListItemText primary={group.groupName} secondary={group.id} />
                </ListItem>
              ))}
            </List>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default PersonGroup;
