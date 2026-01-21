import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/store';

const placesSelector = (state: RootState) => state.places;

export const currentPlaceSelector = createSelector(
  placesSelector,
  (state) => state.currentPlace,
);

export const isLoadingSelector = createSelector(
  placesSelector,
  (state) => state.isLoading,
);

export const errorSelector = createSelector(
  placesSelector,
  (state) => state.error,
);

export const searchHistorySelector = createSelector(
  placesSelector,
  (state) => state.searchHistory,
);
