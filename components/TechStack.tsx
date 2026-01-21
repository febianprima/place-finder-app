'use client';

import React from 'react';
import { Card, Typography, Row, Col } from 'antd';

const { Text } = Typography;

const TechStackComponent = () => {
  return (
    <Card className="mt-6" title="Technology Stack">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card type="inner" size="small">
            <Text strong>Frontend</Text>
            <br />
            <Text type="secondary">Next.js 16</Text>
            <br />
            <Text type="secondary">TypeScript</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card type="inner" size="small">
            <Text strong>State Management</Text>
            <br />
            <Text type="secondary">Redux Toolkit</Text>
            <br />
            <Text type="secondary">Redux Thunk</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card type="inner" size="small">
            <Text strong>UI Library</Text>
            <br />
            <Text type="secondary">Ant Design</Text>
            <br />
            <Text type="secondary">Tailwind CSS</Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card type="inner" size="small">
            <Text strong>Maps & API</Text>
            <br />
            <Text type="secondary">Google Maps API</Text>
            <br />
            <Text type="secondary">Places API</Text>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export const TechStack = React.memo(TechStackComponent);
