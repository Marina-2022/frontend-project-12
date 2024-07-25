import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import currentChannelReducer from '../slices/currentChannelSlice';
import modalSliceReducer from '../slices/modalSlice.js';
import channelsApi from '../api/channelsApi.js';
import messagesApi from '../api/messagesApi.js';

export default configureStore({
  reducer: {
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    auth: authReducer,
    currentChannel: currentChannelReducer,
    modalChannel: modalSliceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    channelsApi.middleware,
    messagesApi.middleware,
  ),
});
