'use client';

import { Layout, Typography } from 'antd';

const { Footer: AntFooter } = Layout;
const { Text } = Typography;

export const Footer = () => {
  return (
    <AntFooter className="text-center bg-gray-900 text-white">
      <Text className="text-white">
        Place Finder ©{new Date().getFullYear()} | Built with Next.js, Redux, and Ant Design
      </Text>
    </AntFooter>
  );
};
