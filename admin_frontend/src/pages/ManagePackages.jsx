import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { packageService } from '../services/api';
import Modal from '../components/Modal';
import FileUpload from '../components/FileUpload';
import './Management.css';

const ManagePackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    destination: '',
    url: '',
    description: '',
    price: '',
    days: '',
    nights: '',
    category: '',
    isFeatured: false,
    thumbSrc: '',
    highlights: [''],
    inclusions: [''],
    exclusions: [''],
    itinerary: []
  });

  // Auto-generate itinerary when days change
  useEffect(() => {
    const daysInt = parseInt(formData.days) || 0;
    if (daysInt > 0 && formData.itinerary.length !== daysInt) {
      setFormData(prev => {
        const newItinerary = Array.from({ length: daysInt }, (_, i) => {
          return prev.itinerary[i] || { day: i + 1, title: '', description: '' };
        });
        return { ...prev, itinerary: newItinerary };
      });
    }
  }, [formData.days]);

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const { data } = await packageService.getAll();
      setPackages(data);
    } catch (error) {
      console.error('Error fetching packages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleArrayChange = (e, index, field) => {
    const newArray = [...formData[field]];
    newArray[index] = e.target.value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeArrayItem = (index, field) => {
    const newArray = [...formData[field]];
    newArray.splice(index, 1);
    setFormData({ ...formData, [field]: newArray });
  };

  const handleItineraryChange = (e, index, subfield) => {
    const newItinerary = [...formData.itinerary];
    newItinerary[index] = { ...newItinerary[index], [subfield]: e.target.value };
    setFormData({ ...formData, itinerary: newItinerary });
  };

  const handleEdit = (pkg) => {
    setCurrentPackage(pkg);
    setFormData({
      title: pkg.title,
      destination: pkg.destination || '',
      url: pkg.url || '',
      description: pkg.description || '',
      price: pkg.price,
      days: pkg.days,
      nights: pkg.nights,
      category: pkg.category || '',
      isFeatured: pkg.isFeatured || false,
      thumbSrc: pkg.thumbSrc || '',
      highlights: pkg.highlights?.length ? pkg.highlights : [''],
      inclusions: pkg.inclusions?.length ? pkg.inclusions : [''],
      exclusions: pkg.exclusions?.length ? pkg.exclusions : [''],
      itinerary: pkg.itinerary || []
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        await packageService.delete(id);
        fetchPackages();
      } catch (error) {
        alert('Failed to delete package');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentPackage) {
        await packageService.update(currentPackage._id, formData);
      } else {
        await packageService.create(formData);
      }
      setIsModalOpen(false);
      fetchPackages();
    } catch (error) {
      alert('Error saving package');
    }
  };

  const openAddModal = () => {
    setCurrentPackage(null);
    setFormData({
      title: '',
      destination: '',
      url: '',
      description: '',
      price: '',
      days: '',
      nights: '',
      category: '',
      isFeatured: false,
      thumbSrc: '',
      highlights: [''],
      inclusions: [''],
      exclusions: [''],
      itinerary: []
    });
    setIsModalOpen(true);
  };

  return (
    <div className="management-page fade-in">
      <div className="page-header-actions">
        <h2>Manage Holiday Packages</h2>
        <button className="btn btn-primary" onClick={openAddModal}>
          <FaPlus /> Add New Package
        </button>
      </div>

      <div className="table-container card">
        <div className="table-controls">
          <div className="search-box">
            <FaSearch />
            <input type="text" placeholder="Search packages..." />
          </div>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Destination</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="6" className="text-center">Loading...</td></tr>
            ) : packages.length > 0 ? (
              packages.map((pkg) => (
                <tr key={pkg._id}>
                  <td>
                    <div className="item-title-cell">
                      <img src={pkg.thumbSrc} alt="" className="table-thumb" />
                      <span>{pkg.title}</span>
                    </div>
                  </td>
                  <td>{pkg.category || 'Holiday'}</td>
                  <td>{pkg.destination}</td>
                  <td>{pkg.days}D / {pkg.nights}N</td>
                  <td>₹{pkg.price?.toLocaleString()}</td>
                  <td>
                    <span className={`badge ${pkg.isFeatured ? 'badge-success' : 'badge-light'}`}>
                      {pkg.isFeatured ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns">
                      <button className="edit-btn" onClick={() => handleEdit(pkg)} title="Edit">
                        <FaEdit />
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(pkg._id)} title="Delete">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="6" className="text-center">No packages found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={currentPackage ? 'Edit Package' : 'Add New Package'}
      >
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Package Title</label>
              <input 
                name="title" 
                value={formData.title} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Destination</label>
              <input 
                name="destination" 
                value={formData.destination} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Category / Theme</label>
              <select 
                name="category" 
                value={formData.category} 
                onChange={handleInputChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Holiday Package">Holiday Package</option>
                <option value="Adventure Tour">Adventure Tour</option>
                <option value="Spiritual Tour">Spiritual Tour</option>
                <option value="Trekking and Hiking">Trekking and Hiking</option>
                <option value="Motorbike Tour">Motorbike Tour</option>
                <option value="Mountain Biking">Mountain Biking</option>
                <option value="Wildlife Safari">Wildlife Safari</option>
              </select>
            </div>
            <div className="form-group">
              <label>Custom URL Path (optional)</label>
              <input 
                name="url" 
                value={formData.url} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="form-group">
              <label>Price (₹)</label>
              <input 
                type="number" 
                name="price" 
                value={formData.price} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Duration (Days)</label>
              <input 
                type="number" 
                name="days" 
                value={formData.days} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Duration (Nights)</label>
              <input 
                type="number" 
                name="nights" 
                value={formData.nights} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="form-group full-width">
              <label>Package Thumbnail</label>
              <FileUpload 
                onUploadSuccess={(url) => setFormData({...formData, thumbSrc: url})} 
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
            
            {/* Dynamic Array Inputs */}
            {['highlights', 'inclusions', 'exclusions'].map(field => (
              <div key={field} className="form-group full-width">
                <label style={{ textTransform: 'capitalize' }}>{field}</label>
                {formData[field].map((item, index) => (
                  <div key={index} style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                    <input 
                      value={item} 
                      onChange={(e) => handleArrayChange(e, index, field)} 
                      placeholder={`Enter ${field.slice(0, -1)}`}
                    />
                    {formData[field].length > 1 && (
                      <button type="button" onClick={() => removeArrayItem(index, field)} className="btn btn-outline" style={{ padding: '0 10px' }}><FaTrash /></button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={() => addArrayItem(field)} className="btn btn-outline btn-sm">
                  <FaPlus /> Add {field.slice(0, -1)}
                </button>
              </div>
            ))}

            <div className="form-group full-width">
              <label>Itinerary (Auto-generated based on Days)</label>
              {formData.itinerary.map((dayObj, index) => (
                <div key={index} className="card" style={{ padding: '15px', marginBottom: '15px', border: '1px solid #ddd' }}>
                  <h4 style={{ marginBottom: '10px' }}>Day {dayObj.day}</h4>
                  <input 
                    placeholder="Day Title (e.g., Arrival in Manali)" 
                    value={dayObj.title} 
                    onChange={(e) => handleItineraryChange(e, index, 'title')} 
                    style={{ marginBottom: '10px' }}
                  />
                  <textarea 
                    placeholder="Day Description" 
                    value={dayObj.description} 
                    onChange={(e) => handleItineraryChange(e, index, 'description')} 
                    rows="2"
                  ></textarea>
                </div>
              ))}
            </div>
            <div className="form-group checkbox-group">
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
            <button type="submit" className="btn btn-primary">Save Package</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManagePackages;
