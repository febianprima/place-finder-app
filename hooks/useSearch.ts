import { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchPlace, setCurrentPlaceWithHistory } from '@/store/slices/placesSlice';
import { getAutocompletePredictions } from '@/services/placesService';
import { Place } from '@/types/place';
import { debounce } from '@/utils/debounce';
import type { RootState, AppDispatch } from '@/store';

interface AutocompleteOption {
  value: string;
  label: React.ReactNode;
  place: Place;
}

export const useSearch = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.places);
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
      } catch (error) {
        console.error('Autocomplete error:', error);
        setOptions([]);
      }
    }, 300),
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
      const { getPlaceDetails } = await import('@/services/placesService');
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
