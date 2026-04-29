import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { accessoryService } from '../services/api';
import Modal from '../components/Modal';
import FileUpload from '../components/FileUpload';
import './Management.css';

const ManageAccessories = () => {
  const getImageUrl = (url) => {
    if (!url) return '';
    if (url.startsWith('http')) return url;
    const apiBase = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/api$/, '') : 'http://localhost:5000';
    return `${apiBase}${url}`;
  };

  const [accessories, setAccessories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAccessory, setCurrentAccessory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Equipment',
    description: '',
    thumbSrc: ''
  });

  useEffect(() => {
    fetchAccessories();
  }, []);

  const fetchAccessories = async () => {
    try {
      const { data } = await accessoryService.getAll();
      setAccessories(data);
    } catch (error) {
      console.error('Error fetching accessories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEdit = (item) => {
    setCurrentAccessory(item);
    setFormData({
      name: item.name,
      price: item.price,
      category: item.category || 'Equipment',
      description: item.description || '',
      thumbSrc: item.thumbSrc || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await accessoryService.delete(id);
        fetchAccessories();
      } catch (error) {
        alert('Failed to delete item');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentAccessory) {
        await accessoryService.update(currentAccessory._id, formData);
      } else {
        await accessoryService.create(formData);
      }
      setIsModalOpen(false);
      fetchAccessories();
    } catch (error) {
      alert('Error saving item');
    }
  };

  const openAddModal = () => {
    setCurrentAccessory(null);
    setFormData({
      name: '',
      price: '',
      category: 'Equipment',
      description: '',
      thumbSrc: ''
    });
    setIsModalOpen(true);
  };

  return (
    <div className="management-page fade-in">
      <div className="page-header-actions">
        <h2>Manage Accessories & Equipment</h2>
        <button className="btn btn-primary" onClick={openAddModal}>
          <FaPlus /> Add New Item
        </button>
      </div>

      <div className="table-container card">
        <div className="table-controls">
          <div className="search-box">
            <FaSearch />
            <input type="text" placeholder="Search equipment..." />
          </div>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Category</th>
              <th>Rent (Per Day)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" className="text-center">Loading...</td></tr>
            ) : accessories.length > 0 ? (
              accessories.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="item-title-cell">
                      {item.thumbSrc && <img src={getImageUrl(item.thumbSrc)} alt="" className="table-thumb" />}
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td>{item.category}</td>
                  <td>₹{item.price}</td>
                  <td>
                    <div className="action-btns">
                      <button className="edit-btn" onClick={() => handleEdit(item)} title="Edit">
                        <FaEdit />
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(item._id)} title="Delete">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4" className="text-center">No equipment found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={currentAccessory ? 'Edit Item' : 'Add New Item'}
      >
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Item Name</label>
              <input 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Rent per Day (₹)</label>
              <input 
                type="number" 
                name="price" 
                value={formData.price} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Category</label>
              <input 
                name="category" 
                value={formData.category} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="form-group full-width">
              <label>Description</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleInputChange} 
                rows="2"
              ></textarea>
            </div>
            <div className="form-group full-width">
              <label>Image (Optional)</label>
              <FileUpload 
                onUploadSuccess={(url) => setFormData({...formData, thumbSrc: url})} 
                currentImage={getImageUrl(formData.thumbSrc)}
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Item</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageAccessories;
