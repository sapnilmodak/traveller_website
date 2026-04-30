import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { pageService } from '../services/api';
import { Typography, Spin, Alert } from 'antd';
import './StaticPage.css';

const { Title, Paragraph } = Typography;

const StaticPage = () => {
  const { slug } = useParams();
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        const { data } = await pageService.getBySlug(slug);
        setPage(data);
        setError(null);
        window.scrollTo(0, 0);
      } catch (err) {
        setError('Page not found or failed to load.');
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [slug]);

  return (
    <div className="static-page-layout">
      <Navbar />
      
      <div className="static-page-header">
        <div className="container">
          <h1>{page ? page.title : 'Loading...'}</h1>
        </div>
      </div>

      <main className="static-content-section section-padding">
        <div className="container">
          <div className="static-card glass-card">
            {loading ? (
              <div className="text-center py-5">
                <Spin size="large" />
                <p className="mt-3">Fetching information...</p>
              </div>
            ) : error ? (
              <Alert message="Error" description={error} type="error" showIcon />
            ) : (
              <div className="page-content-rich">
                <Title level={2}>{page.title}</Title>
                <div 
                  className="content-body" 
                  dangerouslySetInnerHTML={{ __html: page.content.replace(/\n/g, '<br/>') }}
                />
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
      
      <style jsx>{`
        .static-page-header {
          background: var(--dark);
          padding: 100px 0 60px;
          color: white;
          text-align: center;
        }
        .static-page-header h1 {
          font-size: 2.5rem;
          margin: 0;
          color: var(--primary);
        }
        .static-card {
          padding: 40px;
          min-height: 400px;
        }
        .content-body {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #4b5563;
        }
        .page-content-rich h2 {
          margin-bottom: 30px;
          border-bottom: 2px solid var(--primary);
          display: inline-block;
          padding-bottom: 5px;
        }
      `}</style>
    </div>
  );
};

export default StaticPage;
