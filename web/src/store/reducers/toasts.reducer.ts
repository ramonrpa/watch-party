import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Toast {
  id?: string;
  title?: string;
  description?: string;
  type?: 'info' | 'success' | 'warning' | 'error';
  time?: number;
}

const initialState: Toast[] = [];

export const toastsSlice = createSlice({
  name: 'toasts',
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Toast>) => {
      if (!action.payload.id)
        action.payload.id = Math.random().toString(16).slice(2, 8);
      state.push(action.payload);
    },
    removeToast: (state, action: PayloadAction<string>) => {
      const itemIndex = state.findIndex((toast) => toast.id === action.payload);
      state.splice(itemIndex, 1);
    },
  },
});

export const { addToast, removeToast } = toastsSlice.actions;

export default toastsSlice.reducer;
