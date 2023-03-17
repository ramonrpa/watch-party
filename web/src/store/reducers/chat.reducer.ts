import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Message from '~/types/Message';

const initialState: Message[] = [];

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      return [...state, action.payload];
    },
    clearMessages: () => {
      return initialState;
    },
  },
});

export const { addMessage, clearMessages } = chatSlice.actions;

export default chatSlice.reducer;
