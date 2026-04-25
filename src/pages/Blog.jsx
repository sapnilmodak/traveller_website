import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import './Blog.css';

const Blog = () => {
  const blogs = [
    {
      id: 1,
      title: "Top 7 Easy Treks in Ladakh for Beginners",
      excerpt: "If you are planning your first trekking trip to Ladakh, these easy treks are perfect for you...",
      date: "Oct 24, 2024",
      category: "Adventure",
      image: "https://images.unsplash.com/photo-1544085311-11a028465b03?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "The Ultimate Guide to Ladakh Group Tour Packages",
      excerpt: "Traveling in a group is not only fun but also cost-effective. Here is everything you need to know...",
      date: "Sep 15, 2024",
      category: "Information",
      image: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Cultural Festivals of Ladakh: A Visual Journey",
      excerpt: "Ladakh is home to vibrant festivals that showcase the rich heritage of the region...",
      date: "Aug 10, 2024",
      category: "Culture",
      image: "https://images.unsplash.com/photo-1524491991492-e31996457db7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];

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
              {blogs.map(blog => (
                <article key={blog.id} className="blog-card">
                  <div className="blog-image">
                    <img src={blog.image} alt={blog.title} />
                    <span className="blog-category">{blog.category}</span>
                  </div>
                  <div className="blog-content">
                    <span className="blog-date">{blog.date}</span>
                    <h2>{blog.title}</h2>
                    <p>{blog.excerpt}</p>
                    <button className="btn-read">Read More</button>
                  </div>
                </article>
              ))}
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
