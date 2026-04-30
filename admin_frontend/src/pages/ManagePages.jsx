import React, { useState, useEffect } from 'react';
import { pageService } from '../services/api';
import { FaSave, FaShieldAlt, FaGavel, FaUndoAlt, FaInfoCircle, FaFileSignature } from 'react-icons/fa';
import './Management.css';
import './ManagePages.css';

const ManagePages = () => {
  const policyPages = [
    { slug: 'privacy-policy', title: 'Privacy Policy', icon: <FaShieldAlt /> },
    { slug: 'terms-conditions', title: 'Terms & Conditions', icon: <FaGavel /> },
    { slug: 'refund-policy', title: 'Refund & Cancellation Policy', icon: <FaUndoAlt /> },
    { slug: 'contact-info-policy', title: 'Contact Information Policy', icon: <FaInfoCircle /> },
    { slug: 'legal-notice', title: 'Legal Notice & Compliance', icon: <FaFileSignature /> }
  ];

  const [activeSlug, setActiveSlug] = useState(policyPages[0].slug);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPageContent();
  }, [activeSlug]);

  const fetchPageContent = async () => {
    try {
      setLoading(true);
      const { data } = await pageService.getBySlug(activeSlug);
      setContent(data.content);
    } catch (error) {
      setContent('');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      await pageService.upsert({
        slug: activeSlug,
        title: policyPages.find(p => p.slug === activeSlug).title,
        content: content
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
          <div className="sidebar-header">
            <h3>Policy Documents</h3>
            <p>Select a document to edit its content</p>
          </div>
          <div className="policy-links">
            {policyPages.map((page) => (
              <button
                key={page.slug}
                className={activeSlug === page.slug ? 'active' : ''}
                onClick={() => setActiveSlug(page.slug)}
              >
                <span className="icon-wrapper">{page.icon}</span>
                <span className="link-text">{page.title}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="policy-main card">
          <div className="editor-header">
            <div className="title-section">
              <span className="badge">Currently Editing</span>
              <h2>{policyPages.find(p => p.slug === activeSlug)?.title}</h2>
            </div>
            <button 
              type="submit" 
              form="policy-form" 
              className="btn btn-primary save-floating"
              disabled={saving}
            >
              <FaSave /> {saving ? 'Saving Changes...' : 'Save Policy'}
            </button>
          </div>

          <form id="policy-form" onSubmit={handleSave} className="premium-form">
            <div className="form-group full-width">
              <label>Content (HTML Supported)</label>
              <div className="editor-container">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Paste your legal document content here..."
                  required
                ></textarea>
                <div className="editor-footer">
                  <div className="tip">
                    <FaInfoCircle />
                    <span>Tip: You can use &lt;h2&gt; for subheadings and &lt;p&gt; for paragraphs.</span>
                  </div>
                  <div className="stats">
                    {content.length} characters
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ManagePages;
