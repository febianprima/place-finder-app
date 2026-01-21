'use client';

import React from 'react';
import { Card, List, Button, Empty, Typography, Tag, Space } from 'antd';
import {
  DeleteOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  ClearOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  removeFromHistory,
  clearHistory,
  setCurrentPlace,
} from '@/store/slices/placesSlice';
import { SearchHistoryItem } from '@/types/place';
import type { RootState, AppDispatch } from '@/store';

const { Text } = Typography;

export const SearchHistory: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchHistory } = useSelector((state: RootState) => state.places);

  const handleSelectPlace = (item: SearchHistoryItem) => {
    dispatch(setCurrentPlace(item.place));
  };

  const handleRemove = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeFromHistory(id));
  };

  const handleClearAll = () => {
    dispatch(clearHistory());
  };

  const formatTimestamp = (timestamp: number): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

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
        <List
          dataSource={searchHistory}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              onClick={() => handleSelectPlace(item)}
              className="cursor-pointer transition-colors p-3 rounded hover:bg-gray-100"
              actions={[
                <Button
                  key="delete"
                  type="text"
                  size="small"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={(e) => handleRemove(item.id, e)}
                />,
              ]}
            >
              <List.Item.Meta
                avatar={<EnvironmentOutlined className="text-xl text-blue-500" />}
                title={
                  <div className="flex flex-col w-full">
                    <Text strong>{item.place.name}</Text>
                    <Text type="secondary" className="text-xs">
                      {item.query}
                    </Text>
                  </div>
                }
                description={
                  <div className="flex flex-col">
                    <Text type="secondary" className="text-xs">
                      {item.place.formattedAddress}
                    </Text>
                    <Text type="secondary" className="text-[11px]">
                      {formatTimestamp(item.timestamp)}
                    </Text>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};
