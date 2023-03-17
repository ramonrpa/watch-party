import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user.reducer';
import toastsReducer from './reducers/toasts.reducer';
import roomReducer from './reducers/room.reducer';
import chatReducer from './reducers/chat.reducer';
import loadingReducer from './reducers/loading.reducer';

const reducers = combineReducers({
  user: userReducer,
  toasts: toastsReducer,
  room: roomReducer,
  chat: chatReducer,
  loading: loadingReducer,
});

const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
