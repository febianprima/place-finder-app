'use client';

import { Layout, Typography, Row, Col, Divider, Space, Card } from 'antd';
import { EnvironmentOutlined, GithubOutlined } from '@ant-design/icons';
import { SearchBox } from '@/components/SearchBox';
import { Map } from '@/components/Map';
import { SearchHistory } from '@/components/SearchHistory';

const { Header, Content, Footer } = Layout;
const { Title, Text, Link } = Typography;

export default function Home() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          background: '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          padding: '0 50px',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
        }}
      >
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          height: '64px'
        }}>
          <Space>
            <EnvironmentOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
            <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
              Place Finder
            </Title>
          </Space>
          <Space>
            <Link href="https://github.com" target="_blank">
              <GithubOutlined style={{ fontSize: '24px' }} />
            </Link>
          </Space>
        </div>
      </Header>

      <Content style={{ padding: '24px 50px', background: '#f0f2f5' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Hero Section */}
          <div style={{ 
            textAlign: 'center', 
            marginBottom: '32px',
            padding: '40px 20px',
            background: '#fff',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          }}>
            <Title level={1} style={{ marginBottom: '12px' }}>
              Discover Places Around the World
            </Title>
            <Text type="secondary" style={{ fontSize: '16px' }}>
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
                style={{ height: '100%' }}
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
          <Card 
            style={{ marginTop: '24px' }}
            title="Technology Stack"
          >
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

      <Footer style={{ textAlign: 'center', background: '#001529', color: '#fff' }}>
        <Text style={{ color: '#fff' }}>
          Place Finder ©{new Date().getFullYear()} | Built with Next.js, Redux, and Ant Design
        </Text>
      </Footer>
    </Layout>
  );
}
