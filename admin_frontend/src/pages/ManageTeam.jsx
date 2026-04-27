import React, { useState, useEffect } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { teamService } from '../services/api';
import Modal from '../components/Modal';
import FileUpload from '../components/FileUpload';
import './Management.css';

const ManageTeam = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentMember, setCurrentMember] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    designation: '',
    sub_title: '',
    teamSrc: ''
  });

  useEffect(() => {
    fetchTeam();
  }, []);

  const fetchTeam = async () => {
    try {
      const { data } = await teamService.getAll();
      setTeam(data);
    } catch (error) {
      console.error('Error fetching team:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (member) => {
    setCurrentMember(member);
    setFormData({
      title: member.title,
      designation: member.designation || '',
      sub_title: member.sub_title || '',
      teamSrc: member.teamSrc || ''
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to remove this team member?')) {
      try {
        await teamService.delete(id);
        fetchTeam();
      } catch (error) {
        alert('Failed to remove member');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentMember) {
        await teamService.update(currentMember._id, formData);
      } else {
        await teamService.create(formData);
      }
      setIsModalOpen(false);
      fetchTeam();
    } catch (error) {
      alert('Error saving team member');
    }
  };

  const openAddModal = () => {
    setCurrentMember(null);
    setFormData({
      title: '',
      designation: '',
      sub_title: '',
      teamSrc: ''
    });
    setIsModalOpen(true);
  };

  return (
    <div className="management-page fade-in">
      <div className="page-header-actions">
        <h2>Manage Company Team</h2>
        <button className="btn btn-primary" onClick={openAddModal}>
          <FaPlus /> Add Team Member
        </button>
      </div>

      <div className="table-container card">
        <div className="table-controls">
          <div className="search-box">
            <FaSearch />
            <input type="text" placeholder="Search team..." />
          </div>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Designation</th>
              <th>Secondary Title</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan="4" className="text-center">Loading...</td></tr>
            ) : team.length > 0 ? (
              team.map((member) => (
                <tr key={member._id}>
                  <td>
                    <div className="item-title-cell">
                      <img src={member.teamSrc} alt="" className="table-thumb" />
                      <span>{member.title}</span>
                    </div>
                  </td>
                  <td>{member.designation}</td>
                  <td>{member.sub_title}</td>
                  <td>
                    <div className="action-btns">
                      <button className="edit-btn" onClick={() => handleEdit(member)} title="Edit">
                        <FaEdit />
                      </button>
                      <button className="delete-btn" onClick={() => handleDelete(member._id)} title="Delete">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4" className="text-center">No team members found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title={currentMember ? 'Edit Team Member' : 'Add New Member'}
      >
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-grid">
            <div className="form-group full-width">
              <label>Full Name</label>
              <input 
                name="title" 
                value={formData.title} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Designation</label>
              <input 
                name="designation" 
                placeholder="CEO, Guide, etc."
                value={formData.designation} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Secondary Title</label>
              <input 
                name="sub_title" 
                placeholder="Marketing Head, etc."
                value={formData.sub_title} 
                onChange={handleInputChange} 
              />
            </div>
            <div className="form-group full-width">
              <label>Profile Photo</label>
              <FileUpload 
                onUploadSuccess={(url) => setFormData({...formData, teamSrc: url})} 
                currentImage={formData.teamSrc}
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Member</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ManageTeam;
