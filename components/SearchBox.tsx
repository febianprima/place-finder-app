'use client';

import React, { useState, useCallback } from 'react';
import { AutoComplete, Input, Tag } from 'antd';
import { SearchOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { searchPlace } from '@/store/slices/placesSlice';
import { getAutocompletePredictions, isUsingMockData } from '@/services/placesService';
import { Place } from '@/types/place';
import { debounce } from '@/utils/debounce';

interface AutocompleteOption {
  value: string;
  label: React.ReactNode;
  place: Place;
}

export const SearchBox: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.places);
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <EnvironmentOutlined style={{ color: '#1890ff' }} />
              <div>
                <div style={{ fontWeight: 500 }}>{place.name}</div>
                <div style={{ fontSize: '12px', color: '#888' }}>
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
    <div style={{ width: '100%', maxWidth: '600px' }}>
      <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        {usingMockData && (
          <Tag color="orange">Using Mock Data</Tag>
        )}
      </div>
      <AutoComplete
        value={searchValue}
        options={options}
        onSearch={handleSearch}
        onSelect={handleSelect}
        style={{ width: '100%' }}
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
