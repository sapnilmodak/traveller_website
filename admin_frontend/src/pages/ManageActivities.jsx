import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { activityService } from '../services/api';
import Modal from '../components/Modal';
import FileUpload from '../components/FileUpload';
import MultiImageUpload from '../components/MultiImageUpload';
import './Management.css';

const ManageActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    price: '',
    destination: '',
    thumbSrc: '',
    src: '',
    images: [],
    isFeatured: false
  });

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const { data } = await activityService.getAll();
      setActivities(data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleEdit = (act) => {
    setCurrentActivity(act);
    setFormData({
      title: act.title,
      category: act.category || '',
      description: act.description || '',
      price: act.price,
      destination: act.destination || '',
      thumbSrc: act.thumbSrc || '',
      src: act.src || '',
      images: act.images || [],
      isFeatured: act.isFeatured || false
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      try {
        await activityService.delete(id);
        fetchActivities();
      } catch (error) {
        alert('Failed to delete activity');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentActivity) {
        await activityService.update(currentActivity._id, formData);
      } else {
        await activityService.create(formData);
      }
      setIsModalOpen(false);
      fetchActivities();
    } catch (error) {
      alert('Error saving activity');
    }
  };

  const openAddModal = () => {
    setCurrentActivity(null);
    setFormData({
      title: '',
      category: '',
      description: '',
      price: '',
      destination: '',
      thumbSrc: '',
      src: '',
      images: [],
      isFeatured: false
    });
    setIsModalOpen(true);
  };

  return (
    <div className="management-page fade-in">
      <div className="page-header-actions">
        <h2>Manage Adventure Activities</h2>
        <button className="btn btn-primary" onClick={openAddModal}>
          <FaPlus /> Add New Activity
        </button>
      </div>

      <div className="table-container card">
        <div className="table-controls">
          <div className="search-box">
            <FaSearch />
            <input type="text" placeholder="Search activities..." />
          </div>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Destination</th>
              <th>Price</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="3" className="text-center">Loading...</td></tr>
            ) : activities.length > 0 ? (
              activities.map((act) => (
                <tr key={act._id}>
                  <td>
                    <div className="item-title-cell">
                      <img src={act.images?.[0] || act.thumbSrc || act.src} alt="" className="table-thumb" />
                      <span>{act.title}</span>
                    </div>
                  </td>
                  <td>{act.category || 'Adventure'}</td>
                  <td>{act.destination || '-'}</td>
                  <td>₹{act.price?.toLocaleString()}</td>
                  <td>
                    <span className={`badge ${act.isFeatured ? 'badge-success' : 'badge-light'}`}>
                      {act.isFeatured ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns">
                      <button className="edit-btn" onClick={() => handleEdit(act)} title="Edit">
                        <FaEdit />
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(act._id)} title="Delete">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" className="text-center">No activities found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={currentActivity ? 'Edit Activity' : 'Add New Activity'}
      >
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Activity Title</label>
              <input 
                name="title" 
                value={formData.title} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="form-group full-width">
              <label>Category</label>
              <input 
                name="category" 
                value={formData.category} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="form-group full-width">
              <label>Destination</label>
              <input 
                name="destination" 
                value={formData.destination} 
                onChange={handleInputChange} 
                placeholder="e.g. Leh, Nubra Valley"
              />
            </div>
            <div className="form-group full-width">
              <label>Price (₹)</label>
              <input 
                type="number" 
                name="price" 
                value={formData.price} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="form-group full-width">
              <label>Activity Images (Max 3) - First image will be used as Thumbnail</label>
              <MultiImageUpload 
                onUploadSuccess={(urls) => setFormData({...formData, images: urls, thumbSrc: urls[0] || '', src: urls[0] || ''})} 
                currentImages={formData.images}
                maxImages={3}
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
                Mark as Featured
              </label>
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Activity</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageActivities;
