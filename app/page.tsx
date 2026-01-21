'use client';

import { Layout, Typography, Row, Col, Divider, Space, Card } from 'antd';
import { EnvironmentOutlined, GithubOutlined } from '@ant-design/icons';
import { SearchBox, Map, SearchHistory } from '@/components';

const { Header, Content, Footer } = Layout;
const { Title, Text, Link } = Typography;

export default function Home() {
  return (
    <Layout className="min-h-screen">
      <Header className="bg-white shadow-md px-12 sticky top-0 z-[1000]">
        <div className="flex items-center justify-between h-16">
          <Space>
            <EnvironmentOutlined className="text-2xl text-blue-500" />
            <Title level={3} className="!m-0 !text-blue-500">
              Place Finder
            </Title>
          </Space>
          <Space>
            <Link href="https://github.com" target="_blank">
              <GithubOutlined className="text-2xl" />
            </Link>
          </Space>
        </div>
      </Header>

      <Content className="p-6 md:px-12 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8 p-10 md:p-10 bg-white rounded-lg shadow-md">
            <Title level={1} className="!mb-3">
              Discover Places Around the World
            </Title>
            <Text type="secondary" className="text-base">
              Search for any location using Google Places API with intelligent autocomplete
            </Text>
            <Divider />
            <SearchBox />
          </div>

          {/* Main Content Grid */}
          <Row gutter={[24, 24]}>
            {/* Map Section */}
            <Col xs={24} lg={16}>
              <Card 
                title={
                  <Space>
                    <EnvironmentOutlined />
                    <span>Interactive Map</span>
                  </Space>
                }
                bordered={false}
                className="h-full"
              >
                <Map />
              </Card>
            </Col>

            {/* Search History Section */}
            <Col xs={24} lg={8}>
              <SearchHistory />
            </Col>
          </Row>

          {/* Technology Stack Info */}
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
        </div>
      </Content>

      <Footer className="text-center bg-gray-900 text-white">
        <Text className="text-white">
          Place Finder ©{new Date().getFullYear()} | Built with Next.js, Redux, and Ant Design
        </Text>
      </Footer>
    </Layout>
  );
}
