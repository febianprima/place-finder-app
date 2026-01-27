import { APP_CONFIG, FALLBACK_QUERY_RESULT_DATA } from '@/constants';
import { getAutocompletePredictions, getPlaceDetails } from '@/services';
import type { AppDispatch } from '@/store';
import { isLoadingSelector, searchHistorySelector } from '@/store/selectors';
import { searchPlace, setCurrentPlaceWithHistory } from '@/store/slices';
import { debounce, trackPlaceSelection, trackSearch } from '@/utils';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export interface AutocompleteOption {
  value: string;
  label: React.ReactNode;
  place: Place;
  isHistory?: boolean;
  isFallback?: boolean;
}

export const useSearch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(isLoadingSelector);
  const searchHistory = useSelector(searchHistorySelector);
  const [options, setOptions] = useState<AutocompleteOption[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  // Generate empty search suggestions: history first, then fallback data to fill up to 5
  const emptySearchSuggestions = useMemo(() => {
    const suggestions: AutocompleteOption[] = [];
    
    // Add search history (prioritized)
    const historyItems = searchHistory.slice(0, 5).map((item) => ({
      value: `history-${item.id}`,
      label: item.place.name,
      place: item.place,
      isHistory: true,
      isFallback: false,
    }));
    suggestions.push(...historyItems);
    
    // Fill remaining slots with fallback data (up to 5 total)
    const remainingSlots = 5 - suggestions.length;
    if (remainingSlots > 0) {
      // Filter out places that are already in history to avoid duplicates
      const historyPlaceIds = new Set(searchHistory.map(item => item.place.id));
      const fallbackItems = FALLBACK_QUERY_RESULT_DATA
        .filter(place => !historyPlaceIds.has(place.id))
        .slice(0, remainingSlots)
        .map((place) => ({
          value: `fallback-${place.id}`,
          label: place.name,
          place,
          isHistory: false,
          isFallback: true,
        }));
      suggestions.push(...fallbackItems);
    }
    
    return suggestions;
  }, [searchHistory]);

  // Debounced autocomplete search
  const debouncedSearch = useMemo(
    () => debounce(async (value: string) => {
      if (!value || value.trim().length < 2) {
        // Show history + fallback when empty or too short
        if (isFocused) {
          setOptions(emptySearchSuggestions);
        } else {
          setOptions([]);
        }
        return;
      }

      try {
        const predictions = await getAutocompletePredictions(value);
        const autoCompleteOptions: AutocompleteOption[] = predictions.map((place) => ({
          value: place.id, // Use unique place.id as value to avoid duplicate keys
          label: place.name, // Just the name, the component will format it
          place,
          isHistory: false,
          isFallback: false,
        }));
        setOptions(autoCompleteOptions);
      } catch (error: unknown) {
        console.error('Autocomplete error:', error);
        setOptions([]);
      }
    }, APP_CONFIG.AUTOCOMPLETE_DEBOUNCE_MS),
    [isFocused, emptySearchSuggestions]
  );

  const handleSearch = (value: string) => {
    setSearchValue(value);
    debouncedSearch(value);
  };

  const handleFocus = () => {
    setIsFocused(true);
    // Show history + fallback immediately on focus if search is empty
    if (!searchValue || searchValue.trim().length < 2) {
      setOptions(emptySearchSuggestions);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSelect = async (value: string, option: AutocompleteOption) => {
    // Handle history selection - update timestamp by re-adding to history
    if (option.isHistory) {
      trackPlaceSelection(option.place.name, 'history-autocomplete');
      // Use setCurrentPlaceWithHistory to update timestamp and move to top
      dispatch(setCurrentPlaceWithHistory({ 
        place: option.place, 
        query: option.place.name 
      }));
      setSearchValue('');
      setOptions([]);
      return;
    }

    if (option.isFallback) {
      trackPlaceSelection(option.place.name, 'fallback-autocomplete');
      dispatch(setCurrentPlaceWithHistory({ 
        place: option.place, 
        query: option.place.name 
      }));
      trackSearch(option.place.name, true);
      setSearchValue('');
      setOptions([]);
      return;
    }

    // Handle regular autocomplete selection
    trackPlaceSelection(option.place.name, 'autocomplete');
    
    // If the place has a valid location (not 0,0), use it directly
    if (option.place.location.lat !== 0 || option.place.location.lng !== 0) {
      dispatch(setCurrentPlaceWithHistory({ 
        place: option.place, 
        query: option.place.name 
      }));
      trackSearch(option.place.name, true);
    } else if (option.place.placeId) {
      // Otherwise, get place details first to get coordinates
      const placeDetails = await getPlaceDetails(option.place.placeId);
      if (placeDetails) {
        dispatch(setCurrentPlaceWithHistory({ 
          place: placeDetails, 
          query: option.place.name 
        }));
        trackSearch(option.place.name, true);
      } else {
        // Fallback to text search if place details fail
        dispatch(searchPlace(option.place.formattedAddress || option.place.name));
      }
    } else {
      // Fallback to text search if no place_id
      dispatch(searchPlace(option.place.formattedAddress || option.place.name));
    }
    
    // Clear the search box after selection
    setSearchValue('');
    setOptions([]);
  };

  const handlePressEnter = () => {
    if (searchValue.trim()) {
      trackPlaceSelection(searchValue, 'enter');
      dispatch(searchPlace(searchValue));
    }
  };

  return {
    searchValue,
    options,
    isLoading,
    handleSearch,
    handleSelect,
    handlePressEnter,
    handleFocus,
    handleBlur,
  };
};
