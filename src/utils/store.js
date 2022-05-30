import { useState } from 'react';
import { createContainer } from 'react-tracked';
import data from './data.json'

const initialState = {
  count: 0,
  text: 'hello',
  users: data.users,
  currentUser: data.currentUser,
  comments: data.comments
};

const useMyState = () => useState(initialState);

export const { Provider: SharedStateProvider, useTracked: useSharedState } =
  createContainer(useMyState);