import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchPlace, setCurrentPlaceWithHistory } from '@/store/slices';
import { isLoadingSelector } from '@/store/selectors';
import { getAutocompletePredictions, getPlaceDetails } from '@/services';
import { debounce } from '@/utils';
import { APP_CONFIG } from '@/constants';
import type { AppDispatch } from '@/store';

interface AutocompleteOption {
  value: string;
  label: React.ReactNode;
  place: Place;
}

export const useSearch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(isLoadingSelector);
  const [options, setOptions] = useState<AutocompleteOption[]>([]);
  const [searchValue, setSearchValue] = useState('');

  // Debounced autocomplete search
  const debouncedSearch = useMemo(
    () => debounce(async (value: string) => {
      if (!value || value.trim().length < 2) {
        setOptions([]);
        return;
      }

      try {
        const predictions = await getAutocompletePredictions(value);
        const autoCompleteOptions: AutocompleteOption[] = predictions.map((place) => ({
          value: place.name,
          label: place.name, // Just the name, the component will format it
          place,
        }));
        setOptions(autoCompleteOptions);
      } catch (error: unknown) {
        console.error('Autocomplete error:', error);
        setOptions([]);
      }
    }, APP_CONFIG.AUTOCOMPLETE_DEBOUNCE_MS),
    []
  );

  const handleSearch = (value: string) => {
    setSearchValue(value);
    debouncedSearch(value);
  };

  const handleSelect = async (value: string, option: AutocompleteOption) => {
    setSearchValue(value);
    
    // If the place has a valid location (not 0,0), use it directly
    if (option.place.location.lat !== 0 || option.place.location.lng !== 0) {
      dispatch(setCurrentPlaceWithHistory({ 
        place: option.place, 
        query: value 
      }));
    } else if (option.place.placeId) {
      // Otherwise, get place details first to get coordinates
      const placeDetails = await getPlaceDetails(option.place.placeId);
      if (placeDetails) {
        dispatch(setCurrentPlaceWithHistory({ 
          place: placeDetails, 
          query: value 
        }));
      } else {
        // Fallback to text search if place details fail
        dispatch(searchPlace(option.place.formattedAddress || value));
      }
    } else {
      // Fallback to text search if no place_id
      dispatch(searchPlace(option.place.formattedAddress || value));
    }
  };

  const handlePressEnter = () => {
    if (searchValue.trim()) {
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
  };
};
