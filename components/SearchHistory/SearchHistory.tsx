'use client';

import React from 'react';
import { Card, List, Button, Empty, Typography, Tag, Space } from 'antd';
import {
  DeleteOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  ClearOutlined,
} from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  removeFromHistory,
  clearHistory,
  setCurrentPlace,
} from '@/store/slices/placesSlice';
import { SearchHistoryItem } from '@/types/place';

const { Text, Title } = Typography;

const SearchHistory: React.FC = () => {
  const dispatch = useAppDispatch();
  const { searchHistory } = useAppSelector((state) => state.places);

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
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
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
        </Space>
      }
      style={{ height: '100%', maxHeight: '500px', overflow: 'auto' }}
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
              style={{
                cursor: 'pointer',
                transition: 'background 0.2s',
                padding: '12px',
                borderRadius: '4px',
              }}
              className="history-item"
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
                avatar={<EnvironmentOutlined style={{ fontSize: '20px', color: '#1890ff' }} />}
                title={
                  <Space direction="vertical" size={0} style={{ width: '100%' }}>
                    <Text strong>{item.place.name}</Text>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {item.query}
                    </Text>
                  </Space>
                }
                description={
                  <Space direction="vertical" size={0}>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {item.place.formattedAddress}
                    </Text>
                    <Text type="secondary" style={{ fontSize: '11px' }}>
                      {formatTimestamp(item.timestamp)}
                    </Text>
                  </Space>
                }
              />
            </List.Item>
          )}
        />
      )}
      
      <style jsx global>{`
        .history-item:hover {
          background: #f5f5f5 !important;
        }
      `}</style>
    </Card>
  );
};

export default SearchHistory;
