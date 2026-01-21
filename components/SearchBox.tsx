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
      >
        <Input
          size="large"
          placeholder="eg. Maybank Tower Kuala Lumpur"
          prefix={<SearchOutlined />}
          onPressEnter={handlePressEnter}
          disabled={isLoading}
          allowClear
        />
      </AutoComplete>
    </div>
  );
};
