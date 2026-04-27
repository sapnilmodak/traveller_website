import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { blogService } from '../services/api';
import Modal from '../components/Modal';
import FileUpload from '../components/FileUpload';
import './Management.css';

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    excerpt: '',
    content: '',
    thumbSrc: '',
    src: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (blog) => {
    setCurrentBlog(blog);
    setFormData({
      title: blog.title,
      category: blog.category || '',
      excerpt: blog.excerpt || '',
      content: blog.content || '',
      thumbSrc: blog.thumbSrc || '',
      src: blog.src || '',
      date: blog.date ? new Date(blog.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await blogService.delete(id);
        fetchBlogs();
      } catch (error) {
        alert('Failed to delete blog');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentBlog) {
        await blogService.update(currentBlog._id, formData);
      } else {
        await blogService.create(formData);
      }
      setIsModalOpen(false);
      fetchBlogs();
    } catch (error) {
      alert('Error saving blog');
    }
  };

  const openAddModal = () => {
    setCurrentBlog(null);
    setFormData({
      title: '',
      category: '',
      excerpt: '',
      content: '',
      thumbSrc: '',
      src: '',
      date: new Date().toISOString().split('T')[0]
    });
    setIsModalOpen(true);
  };

  return (
    <div className="management-page fade-in">
      <div className="page-header-actions">
        <h2>Manage Travel Stories</h2>
        <button className="btn btn-primary" onClick={openAddModal}>
          <FaPlus /> Post New Blog
        </button>
      </div>

      <div className="table-container card">
        <div className="table-controls">
          <div className="search-box">
            <FaSearch />
            <input type="text" placeholder="Search blogs..." />
          </div>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" className="text-center">Loading...</td></tr>
            ) : blogs.length > 0 ? (
              blogs.map((blog) => (
                <tr key={blog._id}>
                  <td>
                    <div className="item-title-cell">
                      <img src={blog.thumbSrc} alt="" className="table-thumb" />
                      <span>{blog.title}</span>
                    </div>
                  </td>
                  <td>{blog.category}</td>
                  <td>{new Date(blog.date).toLocaleDateString()}</td>
                  <td>
                    <div className="action-btns">
                      <button className="edit-btn" onClick={() => handleEdit(blog)} title="Edit">
                        <FaEdit />
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(blog._id)} title="Delete">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4" className="text-center">No blogs found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={currentBlog ? 'Edit Blog' : 'New Blog Post'}
      >
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Blog Title</label>
              <input 
                name="title" 
                value={formData.title} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input 
                name="category" 
                placeholder="Tips, Adventure, News, etc."
                value={formData.category} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Publish Date</label>
              <input 
                type="date" 
                name="date" 
                value={formData.date} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="form-group full-width">
              <label>Cover Image</label>
              <FileUpload 
                onUploadSuccess={(url) => setFormData({...formData, thumbSrc: url, src: url})} 
                currentImage={formData.thumbSrc}
              />
            </div>
            <div className="form-group full-width">
              <label>Excerpt (Short summary)</label>
              <textarea 
                name="excerpt" 
                value={formData.excerpt} 
                onChange={handleInputChange} 
                rows="2"
              ></textarea>
            </div>
            <div className="form-group full-width">
              <label>Full Content</label>
              <textarea 
                name="content" 
                value={formData.content} 
                onChange={handleInputChange} 
                rows="6"
                required
              ></textarea>
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Publish Blog</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageBlogs;
