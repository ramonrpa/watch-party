import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Room from '~/types/Room';
import Video from '~/types/Video';

const initialState: Room = {
  id: undefined,
  owner: undefined,
  clientCount: 0,
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    setRoom: (state, action: PayloadAction<Room>) => {
      return action.payload;
    },
    setVideo: (state, action: PayloadAction<Video>) => {
      state.video = action.payload;
    },
    setPlaying: (state, action: PayloadAction<boolean>) => {
      state.video.playing = action.payload;
    },
    setClientCount: (state, action: PayloadAction<number>) => {
      state.clientCount = action.payload;
    },
  },
});

export const { setRoom, setVideo, setPlaying, setClientCount } =
  roomSlice.actions;

export default roomSlice.reducer;
