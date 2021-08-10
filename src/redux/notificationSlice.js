import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  alert: { isOpen: false, message: '', type: '' }
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setAlert: (state, action) => {
      state.alert = { isOpen: true, message: action.payload.message, type: action.payload.type };
    },
    closeAlert: state => {
      state.alert = { ...state.alert, isOpen: false };
    }
  }
});

export const alert = state => state.notification.alert;
// Action creators are generated for each case reducer function
export const { setAlert, closeAlert } = notificationSlice.actions;

export default notificationSlice.reducer;
