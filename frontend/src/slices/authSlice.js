/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') || null,
  userName: localStorage.getItem('username') ? localStorage.getItem('username') : '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    // setToken: (state, action) => ({
    //   ...state,
    //   token: action.payload,
    // }),

    setUserName: (state, action) => {
      state.userName = action.payload;
      localStorage.setItem('username', action.payload);
    },
    // setUserName: (state, action) => ({
    //   ...state,
    //   userName: action.payload,
    // }),

    logout: (state) => {
      state.token = null;
      state.userName = '';
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    },
    // logout: (state) => ({
    //   ...state,
    //   token: null,
    //   userName: '',
    // }),
  },
});

export const { setToken, setUserName, logout } = authSlice.actions;

export default authSlice.reducer;
