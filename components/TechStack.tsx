'use client';

import React from 'react';
import { Card, Typography, Row, Col } from 'antd';
import { TECH_STACK_CONFIG } from '@/constants';

const { Text } = Typography;

const TechStackComponent = () => {
  return (
    <Card className="mt-6" title="Technology Stack">
      <Row gutter={[16, 16]}>
        {TECH_STACK_CONFIG.map((stack) => (
          <Col key={stack.title} xs={24} sm={12} md={6}>
            <Card type="inner" size="small">
              <Text strong>{stack.title}</Text>
              {stack.technologies.map((tech) => (
                <React.Fragment key={tech}>
                  <br />
                  <Text type="secondary">{tech}</Text>
                </React.Fragment>
              ))}
            </Card>
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export const TechStack = React.memo(TechStackComponent);
