import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaStar } from 'react-icons/fa';
import { hotelService } from '../services/api';
import Modal from '../components/Modal';
import FileUpload from '../components/FileUpload';
import './Management.css';

const ManageHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentHotel, setCurrentHotel] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    rating: 5,
    thumbSrc: '',
    src: ''
  });

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const { data } = await hotelService.getAll();
      setHotels(data);
    } catch (error) {
      console.error('Error fetching hotels:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (hotel) => {
    setCurrentHotel(hotel);
    setFormData({
      title: hotel.title,
      location: hotel.location || '',
      price: hotel.price || '',
      rating: hotel.rating || 5,
      thumbSrc: hotel.thumbSrc || '',
      src: hotel.src || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this hotel?')) {
      try {
        await hotelService.delete(id);
        fetchHotels();
      } catch (error) {
        alert('Failed to delete hotel');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentHotel) {
        await hotelService.update(currentHotel._id, formData);
      } else {
        await hotelService.create(formData);
      }
      setIsModalOpen(false);
      fetchHotels();
    } catch (error) {
      alert('Error saving hotel');
    }
  };

  const openAddModal = () => {
    setCurrentHotel(null);
    setFormData({
      title: '',
      location: '',
      price: '',
      rating: 5,
      thumbSrc: '',
      src: ''
    });
    setIsModalOpen(true);
  };

  return (
    <div className="management-page fade-in">
      <div className="page-header-actions">
        <h2>Manage Premium Stays</h2>
        <button className="btn btn-primary" onClick={openAddModal}>
          <FaPlus /> Add New Hotel
        </button>
      </div>

      <div className="table-container card">
        <div className="table-controls">
          <div className="search-box">
            <FaSearch />
            <input type="text" placeholder="Search hotels..." />
          </div>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Hotel Name</th>
              <th>Location</th>
              <th>Rating</th>
              <th>Starting Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="text-center">Loading...</td></tr>
            ) : hotels.length > 0 ? (
              hotels.map((hotel) => (
                <tr key={hotel._id}>
                  <td>
                    <div className="item-title-cell">
                      <img src={hotel.thumbSrc} alt="" className="table-thumb" />
                      <span>{hotel.title}</span>
                    </div>
                  </td>
                  <td>{hotel.location}</td>
                  <td>
                    <div className="rating-cell">
                      {hotel.rating} <FaStar className="star-icon" />
                    </div>
                  </td>
                  <td>₹{hotel.price?.toLocaleString()}</td>
                  <td>
                    <div className="action-btns">
                      <button className="edit-btn" onClick={() => handleEdit(hotel)} title="Edit">
                        <FaEdit />
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(hotel._id)} title="Delete">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" className="text-center">No hotels found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={currentHotel ? 'Edit Hotel' : 'Add New Hotel'}
      >
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Hotel Title</label>
              <input 
                name="title" 
                value={formData.title} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input 
                name="location" 
                value={formData.location} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Rating (1-5)</label>
              <select name="rating" value={formData.rating} onChange={handleInputChange}>
                <option value="1">1 Star</option>
                <option value="2">2 Stars</option>
                <option value="3">3 Stars</option>
                <option value="4">4 Stars</option>
                <option value="5">5 Stars</option>
              </select>
            </div>
            <div className="form-group">
              <label>Starting Price (₹)</label>
              <input 
                type="number" 
                name="price" 
                value={formData.price} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="form-group full-width">
              <label>Hotel Image</label>
              <FileUpload 
                onUploadSuccess={(url) => setFormData({...formData, thumbSrc: url, src: url})} 
                currentImage={formData.thumbSrc}
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Hotel</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageHotels;
