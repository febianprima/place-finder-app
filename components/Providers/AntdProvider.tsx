'use client';

import React from 'react';
import { ConfigProvider } from 'antd';

interface AntdProviderProps {
  children: React.ReactNode;
}

/**
 * Ant Design ConfigProvider to customize theme
 */
const AntdProvider: React.FC<AntdProviderProps> = ({ children }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 6,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdProvider;
