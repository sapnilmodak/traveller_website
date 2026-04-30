import React, { useState, useEffect } from 'react';
import { pageService } from '../services/api';
import { FaSave, FaFileAlt } from 'react-icons/fa';
import './Management.css';
import './ManagePages.css';

const ManagePages = () => {
  const policyPages = [
    { slug: 'privacy-policy', title: 'Privacy Policy' },
    { slug: 'terms-conditions', title: 'Terms & Conditions' },
    { slug: 'refund-policy', title: 'Refund & Cancellation Policy' },
    { slug: 'contact-policy', title: 'Contact Information Policy' }
  ];

  const [selectedSlug, setSelectedSlug] = useState(policyPages[0].slug);
  const [formData, setFormData] = useState({
    title: policyPages[0].title,
    content: ''
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPageContent();
  }, [selectedSlug]);

  const fetchPageContent = async () => {
    try {
      setLoading(true);
      const { data } = await pageService.getBySlug(selectedSlug);
      setFormData({
        title: data.title,
        content: data.content
      });
    } catch (error) {
      // If not found, reset to defaults for creation
      const current = policyPages.find(p => p.slug === selectedSlug);
      setFormData({
        title: current.title,
        content: ''
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await pageService.upsert({
        slug: selectedSlug,
        title: formData.title,
        content: formData.content
      });
      alert('Policy updated successfully!');
    } catch (error) {
      alert('Failed to update policy');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="management-page fade-in">
      <div className="page-header-actions">
        <h2>Manage Policies</h2>
      </div>

      <div className="policy-editor-layout">
        <div className="policy-sidebar card">
          <h3>Select Policy</h3>
          <div className="policy-links">
            {policyPages.map(page => (
              <button 
                key={page.slug}
                className={selectedSlug === page.slug ? 'active' : ''}
                onClick={() => setSelectedSlug(page.slug)}
              >
                <FaFileAlt /> {page.title}
              </button>
            ))}
          </div>
        </div>

        <div className="policy-main card">
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label>Page Title</label>
              <input 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Content (Plain Text / HTML)</label>
              <textarea 
                value={formData.content} 
                onChange={(e) => setFormData({...formData, content: e.target.value})} 
                rows="20" 
                placeholder="Enter your policy text here..."
                required
              ></textarea>
              <small style={{ color: '#666', marginTop: '5px', display: 'block' }}>
                Tip: You can use plain text or basic HTML tags for formatting.
              </small>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={saving}>
                <FaSave /> {saving ? 'Saving...' : 'Save Policy'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManagePages;
