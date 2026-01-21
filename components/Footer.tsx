'use client';

import React from 'react';
import { Layout, Typography } from 'antd';

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

const FooterComponent = () => {
  return (
    <AntFooter className="text-center bg-gray-900 text-white">
      <Text className="text-white">
        Place Finder ©{new Date().getFullYear()} | Built with Next.js, Redux, and Ant Design
      </Text>
    </AntFooter>
  );
};

export const Footer = React.memo(FooterComponent);
