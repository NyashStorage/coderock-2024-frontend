import { useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { userActions } from '../stores/users/users.slice';
import { authActions } from '../stores/auth/auth.slice';

export const APPLICATION_ACTIONS = {
  ...authActions,
  ...userActions,
};

export const useActions = (): any => {
  const dispatch = useDispatch();
  return bindActionCreators(APPLICATION_ACTIONS, dispatch);
};
