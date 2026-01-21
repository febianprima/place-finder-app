'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store';

interface ReduxProviderProps {
  children: React.ReactNode;
}

/**
 * Redux Provider component to wrap the application
 * This is a Higher Order Component (HOC) pattern
 */
export const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
