import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { blogService } from '../services/api';
import './Blog.css';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data } = await blogService.getAll();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="blog-page">
      <Navbar />
      <div className="page-header">
        <div className="container">
          <h1>Our Blog</h1>
          <p>Travel Stories and Tips from Ladakh</p>
        </div>
      </div>

      <section className="blog-section section-padding">
        <div className="container">
          <div className="blog-layout">
            <div className="blog-posts">
              {loading ? (
                <div className="loading">Loading blogs...</div>
              ) : (
                blogs.length > 0 ? (
                  blogs.map(blog => (
                    <article key={blog._id} className="blog-card">
                      <div className="blog-image">
                        <img src={blog.thumbSrc || blog.image} alt={blog.title} />
                        <span className="blog-category">{blog.category}</span>
                      </div>
                      <div className="blog-content">
                        <span className="blog-date">{new Date(blog.createdAt).toLocaleDateString()}</span>
                        <h2>{blog.title}</h2>
                        <p>{blog.excerpt || blog.description?.substring(0, 150) + '...'}</p>
                        <button className="btn-read">Read More</button>
                      </div>
                    </article>
                  ))
                ) : (
                  <p>No blog posts found.</p>
                )
              )}
            </div>

            <aside className="blog-sidebar">
              <div className="sidebar-widget">
                <h3>Categories</h3>
                <ul>
                  <li>Road Trip (12)</li>
                  <li>Rafting (5)</li>
                  <li>Adventure (8)</li>
                  <li>Festival (6)</li>
                  <li>Information (10)</li>
                  <li>Culture (7)</li>
                </ul>
              </div>

              <div className="sidebar-widget">
                <h3>Popular Posts</h3>
                <div className="recent-posts">
                  <div className="recent-post-item">
                    <img src="https://images.unsplash.com/photo-1544085311-11a028465b03?ixlib=rb-1.2.1&auto=format&fit=crop&w=150&q=80" alt="" />
                    <div className="recent-info">
                      <h4>Best Time to Visit Ladakh</h4>
                      <span>Sep 10, 2024</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
