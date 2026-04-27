import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { rentalService } from '../services/api';
import Modal from '../components/Modal';
import FileUpload from '../components/FileUpload';
import './Management.css';

const ManageRentals = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRental, setCurrentRental] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    type: '',
    engine: '',
    price: '',
    thumbSrc: '',
    src: '',
    description: '',
    destination: '',
    isFeatured: false
  });

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    try {
      const { data } = await rentalService.getAll();
      setRentals(data);
    } catch (error) {
      console.error('Error fetching rentals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleEdit = (rent) => {
    setCurrentRental(rent);
    setFormData({
      title: rent.title,
      type: rent.type || '',
      engine: rent.engine || '',
      price: rent.price || '',
      thumbSrc: rent.thumbSrc || '',
      src: rent.src || '',
      description: rent.description || '',
      destination: rent.destination || '',
      isFeatured: rent.isFeatured || false
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this rental listing?')) {
      try {
        await rentalService.delete(id);
        fetchRentals();
      } catch (error) {
        alert('Failed to delete rental');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentRental) {
        await rentalService.update(currentRental._id, formData);
      } else {
        await rentalService.create(formData);
      }
      setIsModalOpen(false);
      fetchRentals();
    } catch (error) {
      alert('Error saving rental');
    }
  };

  const openAddModal = () => {
    setCurrentRental(null);
    setFormData({
      title: '',
      type: '',
      engine: '',
      price: '',
      thumbSrc: '',
      src: '',
      description: '',
      destination: '',
      isFeatured: false
    });
    setIsModalOpen(true);
  };

  return (
    <div className="management-page fade-in">
      <div className="page-header-actions">
        <h2>Manage Bike & Car Rentals</h2>
        <button className="btn btn-primary" onClick={openAddModal}>
          <FaPlus /> Add New Rental
        </button>
      </div>

      <div className="table-container card">
        <div className="table-controls">
          <div className="search-box">
            <FaSearch />
            <input type="text" placeholder="Search rentals..." />
          </div>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Type</th>
              <th>Destination</th>
              <th>Engine</th>
              <th>Price/Day</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="text-center">Loading...</td></tr>
            ) : rentals.length > 0 ? (
              rentals.map((rent) => (
                <tr key={rent._id}>
                  <td>
                    <div className="item-title-cell">
                      <img src={rent.thumbSrc} alt="" className="table-thumb" />
                      <span>{rent.title}</span>
                    </div>
                  </td>
                  <td>{rent.type || 'Standard'}</td>
                  <td>{rent.destination || '-'}</td>
                  <td>{rent.engine || 'N/A'}</td>
                  <td>₹{rent.price?.toLocaleString()}</td>
                  <td>
                    <span className={`badge ${rent.isFeatured ? 'badge-success' : 'badge-light'}`}>
                      {rent.isFeatured ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns">
                      <button className="edit-btn" onClick={() => handleEdit(rent)} title="Edit">
                        <FaEdit />
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(rent._id)} title="Delete">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" className="text-center">No rentals found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={currentRental ? 'Edit Rental' : 'Add New Rental'}
      >
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Vehicle Name</label>
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
                placeholder="Adventure, Cruiser, etc."
                value={formData.type} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Destination</label>
              <input 
                name="destination" 
                placeholder="e.g. Leh, Srinagar"
                value={formData.destination} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="form-group">
              <label>Engine Capacity</label>
              <input 
                name="engine" 
                placeholder="350cc, 411cc, etc."
                value={formData.engine} 
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
            <div className="form-group full-width">
              <label>Rental Image</label>
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
            <button type="submit" className="btn btn-primary">Save Rental</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageRentals;
