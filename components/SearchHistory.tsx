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
import { formatTimestamp } from '@/utils';

const { Text, Paragraph } = Typography;

export const SearchHistory: React.FC = () => {
  const {
    searchHistory,
    handleSelectPlace,
    handleRemove,
    handleClearAll,
  } = useSearchHistory();

  return (
      <Card
        title={
          <div className="flex items-center justify-between w-full">
            <Space>
              <ClockCircleOutlined aria-hidden="true" />
              <span>Search History</span>
              {searchHistory.length > 0 && (
                <Tag color="blue" aria-label={`${searchHistory.length} items in history`}>
                  {searchHistory.length}
                </Tag>
              )}
            </Space>
            {searchHistory.length > 0 && (
              <Button
                type="text"
                size="small"
                icon={<ClearOutlined aria-hidden="true" />}
                onClick={handleClearAll}
                danger
                aria-label="Clear all search history"
              >
                Clear All
              </Button>
            )}
          </div>
        }
        className="h-full max-h-[500px] overflow-auto"
        role="region"
        aria-label="Search history"
      >
      {searchHistory.length === 0 ? (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="No search history yet"
        />
      ) : (
            <div className="space-y-2" role="list" aria-label="Search history items">
              {searchHistory.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelectPlace(item)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleSelectPlace(item);
                    }
                  }}
                  className="flex items-start justify-between gap-3 p-3 rounded cursor-pointer transition-colors hover:bg-gray-100 border-b border-gray-100 last:border-b-0"
                  role="listitem button"
                  tabIndex={0}
                  aria-label={`View ${item.place.name} on map`}
                >
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <EnvironmentOutlined className="text-xl text-blue-500 mt-1 flex-shrink-0" />
                <div className="flex flex-col flex-1 min-w-0">
                  <Text strong className="block">{item.place.name}</Text>
                  <Paragraph 
                    type="secondary" 
                    className="text-xs !mb-0 mt-1" 
                    ellipsis={{ rows: 3 }}
                  >
                    {item.place.formattedAddress}
                  </Paragraph>
                  <Text type="secondary" className="text-[11px] block mt-1">
                    {formatTimestamp(item.timestamp)}
                  </Text>
                </div>
              </div>
                  <Button
                    type="text"
                    size="small"
                    danger
                    icon={<DeleteOutlined aria-hidden="true" />}
                    onClick={(e) => handleRemove(item.id, e)}
                    className="flex-shrink-0"
                    aria-label={`Remove ${item.place.name} from history`}
                  />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};
