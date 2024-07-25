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
      state.modalChannel.name = action.payload.name;
      state.modalChannel.id = action.payload.id;
      state.showModal = action.payload.modal;
    },
  },
});

export const { setModalChannel } = modallSlice.actions;

export default modallSlice.reducer;
