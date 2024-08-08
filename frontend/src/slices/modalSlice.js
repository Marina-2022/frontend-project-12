/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modalChannel: {
    name: '',
    id: '',
  },
  showModal: '',
};

const modallSlice = createSlice({
  name: 'modalChannel',
  initialState,
  reducers: {
    setModalChannel(state, action) {
      // console.log('Previous state:', JSON.stringify(state, null, 2));
      // console.log('Action payload:', action.payload);

      state.modalChannel.name = action.payload.name;
      state.modalChannel.id = action.payload.id;
      state.showModal = action.payload.modal;

      // console.log('New state modal:', JSON.stringify(state, null, 2));
    },
  },
});

export const { setModalChannel } = modallSlice.actions;

export default modallSlice.reducer;
