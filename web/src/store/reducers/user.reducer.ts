import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Client from '~/types/Client';

const initialState: Client & { connected: boolean } = {
  id: '',
  name: null,
  roomId: null,
  connected: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setRoomId: (state, action: PayloadAction<string>) => {
      state.roomId = action.payload;
    },
    setConnected: (state, action: PayloadAction<boolean>) => {
      state.connected = action.payload;
    },
  },
});

export const { setId, setName, setRoomId, setConnected } = userSlice.actions;

export default userSlice.reducer;
