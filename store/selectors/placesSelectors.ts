import type { RootState } from '@/store';

export const currentPlaceSelector = (state: RootState) => state.places.currentPlace;

export const isLoadingSelector = (state: RootState) => state.places.isLoading;

export const errorSelector = (state: RootState) => state.places.error;

export const searchHistorySelector = (state: RootState) => state.places.searchHistory;
