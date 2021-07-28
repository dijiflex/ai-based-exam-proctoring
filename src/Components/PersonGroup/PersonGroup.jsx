/* eslint-disable consistent-return */
/* eslint-disable no-use-before-define */
import { Button, makeStyles, Paper, Grid, Typography, List, ListItem, ListItemText } from '@material-ui/core';
import React from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import { useForm, Form } from '../Controls/useForm';
import db from '../../firebase/firebaseUtils';
import api from '../../utils/apiKeys';
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
      const id = uuid();
      const res = await axios.put(
        `${api.endpoint}/face/v1.0/persongroups/${id}`,
        {
          name: values.groupName,
          recognitionModel: 'recognition_04'
        },
        {
          headers: { 'Content-Type': 'application/json', 'Ocp-Apim-Subscription-Key': api.key }
        }
      );
      await db.collection('personGroups').add({
        groupName: values.groupName,
        id
      });

      console.log(res.data);
    } catch (error) {
      console.log(error.response.data);
      // :TODO: Handle error
    }
  };
  return (
    <Paper className={classes.root} elevation={1}>
      <Grid container spacing={1}>
        <Grid item sm={12}>
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
        </Grid>
        <Grid item sm={12}>
          <Typography variant="h6" className={classes.title}>
            All Groups
          </Typography>
          <div className={classes.demo}>
            <List dense>
              <ListItem>
                <ListItemText primary="Single-line item" secondary="Felix" />
              </ListItem>
            </List>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default PersonGroup;
