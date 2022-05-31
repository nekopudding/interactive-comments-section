import { useState } from 'react';
import { createContainer } from 'react-tracked';
import data from './data.json'

const initialState = {
  users: data.users,
  currentUser: data.currentUser,
  comments: data.comments,
  newId: 5
};

const useMyState = () => useState(initialState);

export const { Provider: SharedStateProvider, useTracked: useSharedState } =
  createContainer(useMyState);