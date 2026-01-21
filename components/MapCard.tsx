'use client';

import React from 'react';
import { Card, Typography, Space, Divider } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { SearchBox } from './SearchBox';
import { Map } from './Map';

const { Text } = Typography;

const MapCardComponent = () => {
  return (
    <Card 
      title={
        <Space>
          <EnvironmentOutlined />
          <span>Discover Places Around the World</span>
        </Space>
      }
      className="h-full"
    >
      <Text type="secondary" className="text-base">
        Search for any location using Google Places API with intelligent autocomplete
      </Text>
      <SearchBox />
      <Divider />
      <Map />
    </Card>
  );
};

export const MapCard = React.memo(MapCardComponent);
