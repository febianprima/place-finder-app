import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { searchPlace } from './placesActions';
import { PLACES_INITIAL_STATE, APP_CONFIG } from '@/constants';
import { createHistoryItem } from '@/utils';

const placesSlice = createSlice({
  name: 'places',
  initialState: PLACES_INITIAL_STATE,
  reducers: {
    setCurrentPlace: (state, action: PayloadAction<Place>) => {
      state.currentPlace = action.payload;
    },
    setCurrentPlaceWithHistory: (state, action: PayloadAction<{ place: Place; query: string }>) => {
      state.currentPlace = action.payload.place;
      
      // Add to search history
      const historyItem = createHistoryItem(action.payload.place, action.payload.query);
      
      // Remove existing entry with same place ID to avoid duplicates
      const filteredHistory = state.searchHistory.filter(
        (item) => item.place.id !== action.payload.place.id
      );
      
      // Add to beginning and limit to configured max
      state.searchHistory = [historyItem, ...filteredHistory].slice(0, APP_CONFIG.SEARCH_HISTORY_LIMIT);
    },
    clearCurrentPlace: (state) => {
      state.currentPlace = null;
    },
    removeFromHistory: (state, action: PayloadAction<string>) => {
      state.searchHistory = state.searchHistory.filter(
        (item) => item.id !== action.payload
      );
    },
    clearHistory: (state) => {
      state.searchHistory = [];
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchPlace.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(searchPlace.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentPlace = action.payload.place;
      
      // Add to search history
      const historyItem = createHistoryItem(action.payload.place, action.payload.query);
      
      // Remove existing entry with same place ID to avoid duplicates
      const filteredHistory = state.searchHistory.filter(
        (item) => item.place.id !== action.payload.place.id
      );
        
      // Add to beginning and limit to configured max
      state.searchHistory = [historyItem, ...filteredHistory].slice(0, APP_CONFIG.SEARCH_HISTORY_LIMIT);
    })
      .addCase(searchPlace.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setCurrentPlace,
  setCurrentPlaceWithHistory,
  removeFromHistory,
  clearHistory,
} = placesSlice.actions;

export const placesReducer = placesSlice.reducer;
