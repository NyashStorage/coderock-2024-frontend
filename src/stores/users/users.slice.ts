import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import type { RootState } from '../store';
import type { UserResponse } from './users.dto';

interface UserState extends Partial<UserResponse> {}

const initialState: UserState = {};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    storeUser: (_, { payload }: PayloadAction<UserResponse>) => {
      return payload;
    },
    clearUser: () => {
      return {};
    },
  },
});

export const userActions = usersSlice.actions;
export const useUserState = (): UserState =>
  useSelector((state: RootState) => state.users);
