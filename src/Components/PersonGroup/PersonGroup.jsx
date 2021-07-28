import React from 'react';
import Control from '../Controls/Controls';
import { useForm, Form } from '../Controls/useForm';

const initialFValues = {
  groupName: ''
};

const PersonGroup = () => {
  const { values, handleInputChange, setValues, errors, setErrors } = useForm(initialFValues, true);
  return <div>This is a PersonGroup</div>;
};

export default PersonGroup;
