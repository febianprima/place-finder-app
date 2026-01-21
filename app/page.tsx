'use client';

import { Layout, Row, Col } from 'antd';
import { Header, Footer, MapCard, SearchHistory, TechStack } from '@/components';

const { Content } = Layout;

export default function Home() {
  return (
    <Layout className="min-h-screen">
      <Header />

      <Content className="p-6 md:px-12 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <Row gutter={[24, 24]}>
            <Col xs={24} lg={16}>
              <MapCard />
            </Col>

            <Col xs={24} lg={8}>
              <SearchHistory />
            </Col>
          </Row>

          <TechStack />
        </div>
      </Content>

      <Footer />
    </Layout>
  );
}
