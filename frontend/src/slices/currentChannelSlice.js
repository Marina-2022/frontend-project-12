import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentChannel: { id: '1', name: 'general', removable: false },
};

const currentChannelSlice = createSlice({
  name: 'currentChannel',
  initialState,
  reducers: {
    setCurrentChannel(state, action) {
      return { ...state, currentChannel: action.payload };
    },
  },
});

export const { setCurrentChannel } = currentChannelSlice.actions;

export default currentChannelSlice.reducer;
