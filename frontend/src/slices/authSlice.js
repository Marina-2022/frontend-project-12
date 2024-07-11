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
  },
});

export const { setToken, setUserName } = authSlice.actions;

export default authSlice.reducer;
