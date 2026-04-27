import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { cabService } from '../services/api';
import Modal from '../components/Modal';
import FileUpload from '../components/FileUpload';
import './Management.css';

const ManageCabs = () => {
  const [cabs, setCabs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCab, setCurrentCab] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    capacity: '',
    price: '',
    seats: '',
    destination: '',
    thumbSrc: '',
    src: '',
    description: '',
    isFeatured: false
  });

  useEffect(() => {
    fetchCabs();
  }, []);

  const fetchCabs = async () => {
    try {
      const { data } = await cabService.getAll();
      setCabs(data);
    } catch (error) {
      console.error('Error fetching cabs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleEdit = (cab) => {
    setCurrentCab(cab);
    setFormData({
      title: cab.title,
      type: cab.type || '',
      capacity: cab.capacity || '',
      price: cab.price || '',
      seats: cab.seats || '',
      destination: cab.destination || '',
      thumbSrc: cab.thumbSrc || '',
      src: cab.src || '',
      description: cab.description || '',
      isFeatured: cab.isFeatured || false
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this cab?')) {
      try {
        await cabService.delete(id);
        fetchCabs();
      } catch (error) {
        alert('Failed to delete cab');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentCab) {
        await cabService.update(currentCab._id, formData);
      } else {
        await cabService.create(formData);
      }
      setIsModalOpen(false);
      fetchCabs();
    } catch (error) {
      alert('Error saving cab');
    }
  };

  const openAddModal = () => {
    setCurrentCab(null);
    setFormData({
      title: '',
      type: '',
      capacity: '',
      price: '',
      seats: '',
      destination: '',
      thumbSrc: '',
      src: '',
      description: '',
      isFeatured: false
    });
    setIsModalOpen(true);
  };

  return (
    <div className="management-page fade-in">
      <div className="page-header-actions">
        <h2>Manage Cab Fleet</h2>
        <button className="btn btn-primary" onClick={openAddModal}>
          <FaPlus /> Add New Cab
        </button>
      </div>

      <div className="table-container card">
        <div className="table-controls">
          <div className="search-box">
            <FaSearch />
            <input type="text" placeholder="Search cabs..." />
          </div>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Vehicle Name</th>
              <th>Type</th>
              <th>Destination</th>
              <th>Capacity</th>
              <th>Price/Day</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="text-center">Loading...</td></tr>
            ) : cabs.length > 0 ? (
              cabs.map((cab) => (
                <tr key={cab._id}>
                  <td>
                    <div className="item-title-cell">
                      <img src={cab.thumbSrc} alt="" className="table-thumb" />
                      <span>{cab.title}</span>
                    </div>
                  </td>
                  <td>{cab.type || 'Standard'}</td>
                  <td>{cab.destination || '-'}</td>
                  <td>{cab.capacity || '4+1'}</td>
                  <td>₹{cab.price?.toLocaleString()}</td>
                  <td>
                    <div className="action-btns">
                      <button className="edit-btn" onClick={() => handleEdit(cab)} title="Edit">
                        <FaEdit />
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(cab._id)} title="Delete">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" className="text-center">No cabs found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={currentCab ? 'Edit Cab' : 'Add New Cab'}
      >
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Vehicle Title</label>
              <input 
                name="title" 
                value={formData.title} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Vehicle Type</label>
              <input 
                name="type" 
                placeholder="SUV, Sedan, etc."
                value={formData.type} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Destination</label>
              <input 
                name="destination" 
                placeholder="e.g. Leh, Manali"
                value={formData.destination} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="form-group">
              <label>Capacity</label>
              <input 
                name="capacity" 
                placeholder="6+1"
                value={formData.capacity} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Price (₹ per Day)</label>
              <input 
                type="number" 
                name="price" 
                value={formData.price} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Seats</label>
              <input 
                name="seats" 
                placeholder="Number of seats"
                value={formData.seats} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="form-group full-width">
              <label>Vehicle Image</label>
              <FileUpload 
                onUploadSuccess={(url) => setFormData({...formData, thumbSrc: url, src: url})} 
                currentImage={formData.thumbSrc}
              />
            </div>
            <div className="form-group full-width">
              <label>Description</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleInputChange} 
                rows="3"
              ></textarea>
            </div>
            <div className="form-group checkbox-group full-width">
              <label>
                <input 
                  type="checkbox" 
                  name="isFeatured" 
                  checked={formData.isFeatured} 
                  onChange={handleInputChange} 
                />
                Featured on Homepage
              </label>
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Cab</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageCabs;
