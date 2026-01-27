'use client';

import React, { useState } from 'react';
import { AutoComplete, Input } from 'antd';
import { SearchOutlined, EnvironmentOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useSearch } from '@/hooks';
import { type AutocompleteOption } from '@/hooks/useSearch';

export const SearchBox: React.FC = () => {
  const [inputElement, setInputElement] = useState<HTMLInputElement | null>(null);
  const {
    searchValue,
    options,
    isLoading,
    handleSearch,
    handleSelect,
    handlePressEnter,
    handleFocus,
    handleBlur,
  } = useSearch();

  // Wrap handleSelect to blur input after selection
  const handleSelectWithBlur = async (value: string, option: AutocompleteOption) => {
    await handleSelect(value, option);
    // Blur the input after selection
    inputElement?.blur();
  };

  // Format options with icons and styling
  const formattedOptions = options.map((option) => {
    let icon = <EnvironmentOutlined className="text-blue-500" />;
    let badge = null;

    if (option.isHistory) {
      icon = <ClockCircleOutlined className="text-gray-400" />;
      badge = <span className="ml-2 text-xs text-gray-400">(Recent)</span>;
    }

    return {
      ...option,
      label: (
        <div className="flex items-center gap-2">
          {icon}
          <div>
            <div className="font-medium">
              {option.place.name}
              {badge}
            </div>
            <div className="text-xs text-gray-500">
              {option.place.formattedAddress}
            </div>
          </div>
        </div>
      ),
    };
  });

  return (
    <div className="w-full mt-2">
      <AutoComplete
        value={searchValue}
        options={formattedOptions}
        onSelect={handleSelectWithBlur}
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
          ref={(el) => {
            if (el?.input) {
              setInputElement(el.input);
            }
          }}
          size="large"
          placeholder="eg. Maybank Tower Kuala Lumpur"
          prefix={<SearchOutlined aria-hidden="true" />}
          onPressEnter={handlePressEnter}
          onFocus={handleFocus}
          onBlur={handleBlur}
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
