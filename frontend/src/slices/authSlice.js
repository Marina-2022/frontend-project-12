// /* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
  userName: localStorage.getItem('username') ? localStorage.getItem('username') : '',
  // loggedIn: !!localStorage.getItem('token'),
  // loggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => ({
      ...state,
      token: action.payload,
      // state.token = action.payload;
      // state.loggedIn = !!action.payload;
    }),

    setUserName: (state, action) => ({
      ...state,
      userName: action.payload,
      // state.userName = action.payload;
    }),

    logOut: (state) => ({
      ...state,
      token: null,
      username: '',
    }),
  },
});

export const { setToken, setUserName, logout } = authSlice.actions;

export const selectToken = (state) => state.auth.token;
export const selectUserName = (state) => state.auth.userName;
export const selectLoggedIn = (state) => !!state.auth.token;

export default authSlice.reducer;

// const initialState = {
//   token: null,
//   userName: '',
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     setToken(state, action) {
//       return { ...state, token: action.payload };
//     },

//     setUserName(state, action) {
//       return { ...state, userName: action.payload };
//     },

//     // logOut(state) {
//     //   return { ...state, token: null, userName: '' };
//     // },
//   },
// });

// export const { setToken, setUserName } = authSlice.actions;
