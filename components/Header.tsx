'use client';

import React from 'react';
import { Layout, Typography, Space } from 'antd';
import { EnvironmentOutlined, GithubOutlined } from '@ant-design/icons';

const { Header: AntHeader } = Layout;
const { Title, Link } = Typography;

const HeaderComponent = () => {
  return (
    <AntHeader className="bg-white shadow-md px-12 sticky top-0 z-[1000]">
      <div className="flex items-center justify-between h-16">
        <Space>
          <EnvironmentOutlined className="text-2xl text-blue-500" />
          <Title level={3} className="!m-0 !text-blue-500">
            Place Finder
          </Title>
        </Space>
        <Space>
          <Link href="https://github.com/febianprima/place-finder-app" target="_blank">
            <GithubOutlined className="text-2xl" />
          </Link>
        </Space>
      </div>
    </AntHeader>
  );
};

export const Header = React.memo(HeaderComponent);
