import { createAsyncThunk } from '@reduxjs/toolkit';
import { searchPlaceByQuery } from '@/services';
import { getErrorMessage } from '@/utils';

// Async thunk for searching places
export const searchPlace = createAsyncThunk(
  'places/searchPlace',
  async (query: string, { rejectWithValue }) => {
    try {
      const place = await searchPlaceByQuery(query);
      return { query, place };
    } catch (error: unknown) {
      return rejectWithValue(getErrorMessage(error, 'Search failed'));
    }
  }
);
