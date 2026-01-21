'use client';

import React from 'react';
import { Card, Button, Empty, Typography, Tag, Space } from 'antd';
import {
  DeleteOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  ClearOutlined,
} from '@ant-design/icons';
import { useSearchHistory } from '@/hooks';

const { Text } = Typography;

export const SearchHistory: React.FC = () => {
  const {
    searchHistory,
    handleSelectPlace,
    handleRemove,
    handleClearAll,
    formatTimestamp,
  } = useSearchHistory();

  return (
    <Card
      title={
        <div className="flex items-center justify-between w-full">
          <Space>
            <ClockCircleOutlined />
            <span>Search History</span>
            {searchHistory.length > 0 && (
              <Tag color="blue">{searchHistory.length}</Tag>
            )}
          </Space>
          {searchHistory.length > 0 && (
            <Button
              type="text"
              size="small"
              icon={<ClearOutlined />}
              onClick={handleClearAll}
              danger
            >
              Clear All
            </Button>
          )}
        </div>
      }
      className="h-full max-h-[500px] overflow-auto"
    >
      {searchHistory.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No search history yet"
        />
      ) : (
        <div className="space-y-2">
          {searchHistory.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelectPlace(item)}
              className="flex items-start justify-between gap-3 p-3 rounded cursor-pointer transition-colors hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <EnvironmentOutlined className="text-xl text-blue-500 mt-1 flex-shrink-0" />
                <div className="flex flex-col flex-1 min-w-0">
                  <Text strong className="block">{item.place.name}</Text>
                  <Text type="secondary" className="text-xs block">
                    {item.query}
                  </Text>
                  <Text type="secondary" className="text-xs block mt-1">
                    {item.place.formattedAddress}
                  </Text>
                  <Text type="secondary" className="text-[11px] block mt-1">
                    {formatTimestamp(item.timestamp)}
                  </Text>
                </div>
              </div>
              <Button
                type="text"
                size="small"
                danger
                icon={<DeleteOutlined />}
                onClick={(e) => handleRemove(item.id, e)}
                className="flex-shrink-0"
              />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
