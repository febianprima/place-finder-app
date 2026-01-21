'use client';

import React from 'react';
import { AutoComplete, Input } from 'antd';
import { SearchOutlined, EnvironmentOutlined } from '@ant-design/icons';
import { useSearch } from '@/hooks';

export const SearchBox: React.FC = () => {
  const {
    searchValue,
    options,
    isLoading,
    handleSearch,
    handleSelect,
    handlePressEnter,
  } = useSearch();

  // Format options with icons and styling
  const formattedOptions = options.map((option) => ({
    ...option,
    label: (
      <div className="flex items-center gap-2">
        <EnvironmentOutlined className="text-blue-500" />
        <div>
          <div className="font-medium">{option.place.name}</div>
          <div className="text-xs text-gray-500">
            {option.place.formattedAddress}
          </div>
        </div>
      </div>
    ),
  }));

  return (
    <div className="w-full mt-2">
      <AutoComplete
        value={searchValue}
        options={formattedOptions}
        onSelect={handleSelect}
        className="w-full"
        showSearch={{
          onSearch: handleSearch,
        }}
        aria-label="Search for places"
        role="combobox"
        aria-expanded={formattedOptions.length > 0}
        aria-haspopup="listbox"
      >
        <Input
          size="large"
          placeholder="eg. Maybank Tower Kuala Lumpur"
          prefix={<SearchOutlined aria-hidden="true" />}
          onPressEnter={handlePressEnter}
          disabled={isLoading}
          allowClear
          aria-label="Place search input"
          aria-describedby="search-instructions"
        />
      </AutoComplete>
      <div id="search-instructions" className="sr-only">
        Type to search for places. Use arrow keys to navigate suggestions. Press Enter to select.
      </div>
    </div>
  );
};
