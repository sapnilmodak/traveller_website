import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import PackageCard from '../components/PackageCard';
import { packageService } from '../services/api';
import './ListingPage.css';
import { useLocation } from 'react-router-dom';
import { Row, Col, Checkbox, Skeleton, Empty, Typography, Card, Space } from 'antd';

const { Title, Text } = Typography;

const Packages = () => {
  const location = useLocation();
  const [packages, setPackages] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDestinations, setSelectedDestinations] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const initialCategory = queryParams.get('category');
    if (initialCategory) {
      setSelectedCategories([initialCategory]);
    }
    fetchInitialData(initialCategory);
  }, []);

  const fetchInitialData = async (initialCat) => {
    try {
      setLoading(true);
      const [packagesRes, destinationsRes, categoriesRes] = await Promise.all([
        packageService.getAll(initialCat ? { category: initialCat } : {}),
        packageService.getDestinations(),
        packageService.getCategories()
      ]);
      setPackages(packagesRes.data);
      setDestinations(destinationsRes.data);
      setCategories(categoriesRes.data);
    } catch (error) {
      console.error('Error fetching package data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = async (dest, cat) => {
    let updatedDests = [...selectedDestinations];
    if (dest) {
      if (updatedDests.includes(dest)) {
        updatedDests = updatedDests.filter(d => d !== dest);
      } else {
        updatedDests.push(dest);
      }
      setSelectedDestinations(updatedDests);
    }

    let updatedCats = [...selectedCategories];
    if (cat) {
      if (updatedCats.includes(cat)) {
        updatedCats = updatedCats.filter(c => c !== cat);
      } else {
        updatedCats.push(cat);
      }
      setSelectedCategories(updatedCats);
    }
    
    // Fetch filtered data
    try {
      setLoading(true);
      const { data } = await packageService.getAll({ 
        destination: updatedDests.length > 0 ? updatedDests.join(',') : undefined,
        category: updatedCats.length > 0 ? updatedCats.join(',') : undefined
      });
      setPackages(data);
    } catch (error) {
      console.error('Error filtering packages:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="listing-page">
      <Navbar />
      <div className="page-header">
        <div className="container">
          <Title level={1}>Holiday Packages</Title>
          <Text>Explore the Best of Ladakh and Beyond</Text>
        </div>
      </div>

      <section className="listing-section section-padding">
        <div className="container">
          <Row gutter={[32, 32]}>
            <Col xs={24} lg={6}>
              <aside className="sidebar">
                <Card className="filter-card">
                  <div className="filter-widget">
                    <Title level={4}>Destination</Title>
                    <Space direction="vertical" style={{ width: '100%' }}>
                      {destinations.length > 0 ? (
                        destinations.map(dest => (
                          <Checkbox 
                            key={dest}
                            checked={selectedDestinations.includes(dest)}
                            onChange={() => handleFilterChange(dest, null)}
                          >
                            {dest}
                          </Checkbox>
                        ))
                      ) : (
                        <Text type="secondary">No destinations found</Text>
                      )}
                    </Space>
                  </div>

                  <div className="filter-widget" style={{ marginTop: '30px' }}>
                    <Title level={4}>Package Theme</Title>
                    <Space direction="vertical" style={{ width: '100%' }}>
                      {categories.length > 0 ? (
                        categories.map(cat => (
                          <Checkbox 
                            key={cat}
                            checked={selectedCategories.includes(cat)}
                            onChange={() => handleFilterChange(null, cat)}
                          >
                            {cat}
                          </Checkbox>
                        ))
                      ) : (
                        <Text type="secondary">No categories found</Text>
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
                    {packages.length > 0 ? (
                      <Row gutter={[24, 24]}>
                        {packages.map(pkg => (
                          <Col xs={24} sm={12} key={pkg._id}>
                            <PackageCard item={pkg} />
                          </Col>
                        ))}
                      </Row>
                    ) : (
                      <Empty description="No packages found." />
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

export default Packages;
