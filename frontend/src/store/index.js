import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import currentChannelReducer from '../slices/currentChannelSlice';
import channelsApi from '../api/channelsApi.js';

export default configureStore({
  reducer: {
    [channelsApi.reducerPath]: channelsApi.reducer,
    auth: authReducer,
    currentChannel: currentChannelReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    channelsApi.middleware,
  ),
});
