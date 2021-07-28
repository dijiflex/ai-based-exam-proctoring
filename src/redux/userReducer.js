import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    logoutUser: state => {
      state.currentUser = null;
    }
  }
});
export const getCurrentUser = state => state.user.currentUser;

// Action creators are generated for each case reducer function
export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
