import { configureStore } from '@reduxjs/toolkit';
import placesReducer from './slices/placesSlice';

export const store = configureStore({
  reducer: {
    places: placesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['places/searchPlace/fulfilled'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
