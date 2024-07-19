import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  userName: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken(state, action) {
      return { ...state, token: action.payload };
    },

    setUserName(state, action) {
      return { ...state, userName: action.payload };
    },

    logOut(state) {
      return { ...state, token: null, userName: '' };
    },
  },
});

export const { setToken, setUserName, logOut } = authSlice.actions;

export default authSlice.reducer;
