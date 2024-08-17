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
    setModalChannel: (state, action) => ({
      ...state,
      modalChannel: {
        ...state.modalChannel,
        name: action.payload.name,
        id: action.payload.id,
      },
      showModal: action.payload.modal,
    }),
  },
});

export const { setModalChannel } = modallSlice.actions;

export default modallSlice.reducer;
