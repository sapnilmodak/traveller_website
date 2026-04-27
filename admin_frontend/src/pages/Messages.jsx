import React, { useState, useEffect } from 'react';
import { FaTrash, FaSearch, FaEye } from 'react-icons/fa';
import { contactService } from '../services/api';
import Modal from '../components/Modal';
import './Management.css';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const { data } = await contactService.getAll();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleView = (msg) => {
    setSelectedMessage(msg);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await contactService.delete(id);
        fetchMessages();
      } catch (error) {
        alert('Failed to delete message');
      }
    }
  };

  return (
    <div className="management-page fade-in">
      <div className="page-header-actions">
        <h2>Contact Form Messages</h2>
      </div>

      <div className="table-container card">
        <div className="table-controls">
          <div className="search-box">
            <FaSearch />
            <input type="text" placeholder="Search messages..." />
          </div>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Sender</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="5" className="text-center">Loading...</td></tr>
            ) : messages.length > 0 ? (
              messages.map((msg) => (
                <tr key={msg._id}>
                  <td><strong>{msg.name}</strong></td>
                  <td>{msg.email}</td>
                  <td>{msg.subject || 'No Subject'}</td>
                  <td>{new Date(msg.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="action-btns">
                      <button className="edit-btn" onClick={() => handleView(msg)} title="View Content">
                        <FaEye />
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(msg._id)} title="Delete">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="5" className="text-center">No messages found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Message Content"
      >
        {selectedMessage && (
          <div className="detail-view">
            <div className="detail-row">
              <label>From:</label>
              <span>{selectedMessage.name} ({selectedMessage.email})</span>
            </div>
            <div className="detail-row">
              <label>Subject:</label>
              <span>{selectedMessage.subject || 'N/A'}</span>
            </div>
            <div className="detail-row">
              <label>Message:</label>
              <p className="message-text">{selectedMessage.message}</p>
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

export default Messages;
