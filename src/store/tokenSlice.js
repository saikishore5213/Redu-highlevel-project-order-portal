import { createSlice } from '@reduxjs/toolkit';

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    token: null,
    roles: null,
    isNoRole: false,
    userName: '',
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setRoles: (state, action) => {
      state.roles = action.payload;
    },
    setIsNoRoles: (state, action) => {
      state.isNoRole = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
  },
});

export default tokenSlice.reducer;
export const { setToken, setRoles, setIsNoRoles, setUserName } = tokenSlice.actions;
