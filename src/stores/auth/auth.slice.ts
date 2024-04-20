import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';

interface AuthState {
  token: string | null;
}

const initialState: AuthState = {
  token: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    saveToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
    clearToken: (state) => {
      state.token = null;
    },
  },
});

export const authActions = authSlice.actions;
export const useAuthState = (): AuthState =>
  useSelector((state: RootState) => state.auth);
