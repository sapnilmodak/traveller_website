import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PackageCard from '../components/PackageCard';
import { cabService } from '../services/api';
import './ListingPage.css';
import { useLocation } from 'react-router-dom';
import { Row, Col, Checkbox, Skeleton, Empty, Typography, Card, Space } from 'antd';

const { Title, Text } = Typography;

const Cab = () => {
  const location = useLocation();
  const [cabs, setCabs] = useState([]);
  const [types, setTypes] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedDestinations, setSelectedDestinations] = useState([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const initialDest = queryParams.get('destination');
    if (initialDest) {
      setSelectedDestinations([initialDest]);
    }
    fetchInitialData(initialDest);
  }, []);

  const fetchInitialData = async (initialDest) => {
    try {
      setLoading(true);
      const [cabsRes, typesRes, destinationsRes] = await Promise.all([
        cabService.getAll(initialDest ? { destination: initialDest } : {}),
        cabService.getTypes(),
        cabService.getDestinations()
      ]);
      setCabs(cabsRes.data);
      setTypes(typesRes.data);
      setDestinations(destinationsRes.data);
    } catch (error) {
      console.error('Error fetching cab data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = async (type, dest) => {
    let updatedTypes = [...selectedTypes];
    if (type) {
      if (updatedTypes.includes(type)) {
        updatedTypes = updatedTypes.filter(t => t !== type);
      } else {
        updatedTypes.push(type);
      }
      setSelectedTypes(updatedTypes);
    }

    let updatedDests = [...selectedDestinations];
    if (dest) {
      if (updatedDests.includes(dest)) {
        updatedDests = updatedDests.filter(d => d !== dest);
      } else {
        updatedDests.push(dest);
      }
      setSelectedDestinations(updatedDests);
    }
    
    // Fetch filtered data
    try {
      setLoading(true);
      const { data } = await cabService.getAll({ 
        type: updatedTypes.length > 0 ? updatedTypes.join(',') : undefined,
        destination: updatedDests.length > 0 ? updatedDests.join(',') : undefined
      });
      setCabs(data);
    } catch (error) {
      console.error('Error filtering cabs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="listing-page">
      <Navbar />
      <div className="page-header">
        <div className="container">
          <Title level={1}>Cab Services</Title>
          <Text>Reliable and Comfortable Transportation in Ladakh</Text>
        </div>
      </div>

      <section className="listing-section section-padding">
        <div className="container">
          <Row gutter={[32, 32]}>
            <Col xs={24} lg={6}>
              <aside className="sidebar">
                <Card className="filter-card">
                  <div className="filter-widget">
                    <Title level={4}>Vehicle Type</Title>
                    <Space direction="vertical" style={{ width: '100%' }}>
                      {types.length > 0 ? (
                        types.map(type => (
                          <Checkbox 
                            key={type}
                            checked={selectedTypes.includes(type)}
                            onChange={() => handleFilterChange(type, null)}
                          >
                            {type}
                          </Checkbox>
                        ))
                      ) : (
                        <Text type="secondary">No types found</Text>
                      )}
                    </Space>
                  </div>

                  <div className="filter-widget" style={{ marginTop: '30px' }}>
                    <Title level={4}>Destination</Title>
                    <Space direction="vertical" style={{ width: '100%' }}>
                      {destinations.length > 0 ? (
                        destinations.map(dest => (
                          <Checkbox 
                            key={dest}
                            checked={selectedDestinations.includes(dest)}
                            onChange={() => handleFilterChange(null, dest)}
                          >
                            {dest}
                          </Checkbox>
                        ))
                      ) : (
                        <Text type="secondary">No destinations found</Text>
                      )}
                    </Space>
                  </div>
                </Card>
              </aside>
            </Col>

            <Col xs={24} lg={18}>
              <main className="main-content">
                {loading ? (
                  <Row gutter={[24, 24]}>
                    {[1, 2, 3, 4, 5, 6].map(i => (
                      <Col xs={24} sm={12} key={i}>
                        <Skeleton active avatar paragraph={{ rows: 4 }} />
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <>
                    {cabs.length > 0 ? (
                      <Row gutter={[24, 24]}>
                        {cabs.map(cab => (
                          <Col xs={24} sm={12} key={cab._id}>
                            <PackageCard item={cab} type="cab" />
                          </Col>
                        ))}
                      </Row>
                    ) : (
                      <Empty description="No cabs available." />
                    )}
                  </>
                )}
              </main>
            </Col>
          </Row>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cab;
