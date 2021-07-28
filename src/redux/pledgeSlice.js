/* eslint-disable no-return-await */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  allPledges: [],
  status: null,
  error: null
};

export const Pledgeslice = createSlice({
  name: 'pledge',
  initialState,
  reducers: {}
});
export const geAlltPledges = ({ pledge }) => pledge.allPledges;

// Action creators are generated for each case reducer function
// export const { setUser, logoutUser } = Pledgeslice.actions;

export default Pledgeslice.reducer;
