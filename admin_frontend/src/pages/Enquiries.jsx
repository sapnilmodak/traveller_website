import React, { useState, useEffect } from 'react';
import { FaTrash, FaSearch, FaEye } from 'react-icons/fa';
import { enquiryService } from '../services/api';
import Modal from '../components/Modal';
import './Management.css';

const Enquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const { data } = await enquiryService.getAll();
      setEnquiries(data);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (enq) => {
    setSelectedEnquiry(enq);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this enquiry record?')) {
      try {
        await enquiryService.delete(id);
        fetchEnquiries();
      } catch (error) {
        alert('Failed to delete enquiry');
      }
    }
  };

  return (
    <div className="management-page fade-in">
      <div className="page-header-actions">
        <h2>User Enquiries</h2>
      </div>

      <div className="table-container card">
        <div className="table-controls">
          <div className="search-box">
            <FaSearch />
            <input type="text" placeholder="Search by name or email..." />
          </div>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Package/Destination</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="text-center">Loading...</td></tr>
            ) : enquiries.length > 0 ? (
              enquiries.map((enq) => (
                <tr key={enq._id}>
                  <td><strong>{enq.name}</strong></td>
                  <td>{enq.email}</td>
                  <td>{enq.destination || 'N/A'}</td>
                  <td>{new Date(enq.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="action-btns">
                      <button className="edit-btn" onClick={() => handleView(enq)} title="View Details">
                        <FaEye />
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(enq._id)} title="Delete">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" className="text-center">No enquiries found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Enquiry Details"
      >
        {selectedEnquiry && (
          <div className="detail-view">
            <div className="detail-row">
              <label>Full Name:</label>
              <span>{selectedEnquiry.name}</span>
            </div>
            <div className="detail-row">
              <label>Email Address:</label>
              <span>{selectedEnquiry.email}</span>
            </div>
            <div className="detail-row">
              <label>Phone Number:</label>
              <span>{selectedEnquiry.phone || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <label>Destination / Package:</label>
              <span>{selectedEnquiry.destination || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <label>Travel Date:</label>
              <span>{selectedEnquiry.travelDate ? new Date(selectedEnquiry.travelDate).toLocaleDateString() : 'N/A'}</span>
            </div>
            <div className="detail-row">
              <label>Message / Requirements:</label>
              <p className="message-text">{selectedEnquiry.message || 'No additional requirements provided.'}</p>
            </div>
            <div className="form-actions">
              <button className="btn btn-primary" onClick={() => setIsModalOpen(false)}>Close</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Enquiries;
