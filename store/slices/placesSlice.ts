import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Place, PlacesState, SearchHistoryItem } from '@/types/place';
import { searchPlaceByQuery } from '@/services/placesService';

const initialState: PlacesState = {
  currentPlace: null,
  searchHistory: [],
  isLoading: false,
  error: null,
};

// Async thunk for searching places
export const searchPlace = createAsyncThunk(
  'places/searchPlace',
  async (query: string, { rejectWithValue }) => {
    try {
      const place = await searchPlaceByQuery(query);
      return { query, place };
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : 'Search failed');
    }
  }
);

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: {
    setCurrentPlace: (state, action: PayloadAction<Place>) => {
      state.currentPlace = action.payload;
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
  clearCurrentPlace,
  removeFromHistory,
  clearHistory,
  clearError,
} = placesSlice.actions;

export default placesSlice.reducer;
