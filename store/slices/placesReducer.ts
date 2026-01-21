import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { searchPlace } from './placesActions';
import { PLACES_INITIAL_STATE } from '@/constants';

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
      const historyItem: SearchHistoryItem = {
        id: `${Date.now()}-${Math.random()}`,
        query: action.payload.query,
        place: action.payload.place,
        timestamp: Date.now(),
      };
      
      // Add to beginning and limit to 20 items
      state.searchHistory = [historyItem, ...state.searchHistory].slice(0, 20);
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
      const historyItem: SearchHistoryItem = {
          id: `${Date.now()}-${Math.random()}`,
          query: action.payload.query,
          place: action.payload.place,
          timestamp: Date.now(),
        };
        
        // Add to beginning and limit to 20 items
        state.searchHistory = [historyItem, ...state.searchHistory].slice(0, 20);
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
