import React, { useState, useEffect } from 'react';
import { pageService } from '../services/api';
import { FaSave, FaFileAlt } from 'react-icons/fa';
import './Management.css';

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

      <style jsx>{`
        .policy-editor-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 20px;
          margin-top: 20px;
        }
        .policy-sidebar {
          padding: 20px;
          height: fit-content;
        }
        .policy-links {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 15px;
        }
        .policy-links button {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 15px;
          border: 1px solid #eee;
          border-radius: 8px;
          background: #fff;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          color: #64748b;
          font-weight: 500;
        }
        .policy-links button:hover {
          background: #f8fafc;
          border-color: var(--primary);
        }
        .policy-links button.active {
          background: var(--primary);
          color: #fff;
          border-color: var(--primary);
        }
        .policy-main {
          padding: 30px;
        }
        textarea {
          width: 100%;
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 15px;
          font-family: inherit;
          resize: vertical;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
};

export default ManagePages;
