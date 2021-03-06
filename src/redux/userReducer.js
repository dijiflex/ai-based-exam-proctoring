/* eslint-disable no-return-await */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllUsers } from '../firebase/firebaseUtils';

const initialState = {
  currentUser: null,
  allUsers: {
    data: [],
    status: null,
    error: null
  },
  proctoring: false,
  examStatus: false
};

export const fetchUsers = createAsyncThunk('users/fetchUsers', async userId => {
  return await getAllUsers(userId);
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload;
    },
    logoutUser: state => {
      state.currentUser = null;
    },
    setIdentityStatus: (state, action) => {
      state.currentUser.identityStatus = action.payload;
    },
    updateProctoring: (state, action) => {
      state.proctoring = action.payload;
    },
    setExam: (state, action) => {
      state.examStatus = action.payload;
    },
    setUserExamStatus: (state, action) => {
      state.currentUser.examStatus = action.payload;
    }
  },
  extraReducers: {
    [fetchUsers.pending]: state => {
      state.allUsers.status = 'loading';
    },
    [fetchUsers.fulfilled]: (state, { payload }) => {
      state.allUsers.status = 'success';
      state.allUsers.data = payload;
    },
    [fetchUsers.rejected]: (state, { payload }) => {
      state.allUsers.status = 'failed';
      state.allUsers.error = payload;
    }
  }
});
export const getCurrentUser = state => state.user.currentUser;

// Action creators are generated for each case reducer function
export const { setUser, logoutUser, setIdentityStatus, updateProctoring, setExam, setUserExamStatus } =
  userSlice.actions;

export default userSlice.reducer;
