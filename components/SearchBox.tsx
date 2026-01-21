'use client';

import React, { useState, useCallback } from 'react';
import { AutoComplete, Input, Tag } from 'antd';
import { SearchOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { searchPlace } from '@/store/slices/placesSlice';
import { getAutocompletePredictions, isUsingMockData } from '@/services/placesService';
import { Place } from '@/types/place';
import { debounce } from '@/utils/debounce';
import type { RootState, AppDispatch } from '@/store';

interface AutocompleteOption {
  value: string;
  label: React.ReactNode;
  place: Place;
}

export const SearchBox: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading } = useSelector((state: RootState) => state.places);
  const [options, setOptions] = useState<AutocompleteOption[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const usingMockData = isUsingMockData();

  // Debounced autocomplete search
  const debouncedSearch = useCallback(
    debounce(async (value: string) => {
      if (!value || value.trim().length < 2) {
        setOptions([]);
        return;
      }

      try {
        const predictions = await getAutocompletePredictions(value);
        const autoCompleteOptions: AutocompleteOption[] = predictions.map((place) => ({
          value: place.name,
          label: (
            <div className="flex items-center gap-2">
              <EnvironmentOutlined className="text-blue-500" />
              <div>
                <div className="font-medium">{place.name}</div>
                <div className="text-xs text-gray-500">
                  {place.formattedAddress}
                </div>
              </div>
            </div>
          ),
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
      dispatch(searchPlace(option.place.formattedAddress || value));
    } else if (option.place.placeId) {
      // Otherwise, get place details first
      const { getPlaceDetails } = await import('@/services/placesService');
      const placeDetails = await getPlaceDetails(option.place.placeId);
      if (placeDetails) {
        dispatch(searchPlace(placeDetails.formattedAddress));
      } else {
        dispatch(searchPlace(option.place.formattedAddress || value));
      }
    } else {
      dispatch(searchPlace(option.place.formattedAddress || value));
    }
  };

  const handlePressEnter = () => {
    if (searchValue.trim()) {
      dispatch(searchPlace(searchValue));
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="mb-3 flex items-center gap-2">
        {usingMockData && (
          <Tag color="orange">Using Mock Data</Tag>
        )}
      </div>
      <AutoComplete
        value={searchValue}
        options={options}
        onSearch={handleSearch}
        onSelect={handleSelect}
        className="w-full"
        size="large"
      >
        <Input
          size="large"
          placeholder="Search for a place..."
          prefix={<SearchOutlined />}
          onPressEnter={handlePressEnter}
          disabled={isLoading}
          allowClear
        />
      </AutoComplete>
    </div>
  );
};
