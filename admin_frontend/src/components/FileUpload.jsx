import React, { useState } from 'react';
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa';
import { uploadImage } from '../services/api';
import './FileUpload.css';

const FileUpload = ({ onUploadSuccess, currentImage }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage || '');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Upload to server
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);

    try {
      const { data } = await uploadImage(formData);
      // The backend returns a path like /uploads/filename.jpg
      // We prepend the base URL for the preview and save the path in the DB
      const fullUrl = `http://localhost:5000${data.url}`;
      onUploadSuccess(fullUrl);
      setPreview(fullUrl);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setPreview('');
    onUploadSuccess('');
  };

  return (
    <div className="file-upload-container">
      {preview ? (
        <div className="preview-container">
          <img src={preview} alt="Preview" className="image-preview" />
          <button type="button" className="remove-image-btn" onClick={removeImage}>
            <FaTimes />
          </button>
        </div>
      ) : (
        <label className={`upload-label ${uploading ? 'disabled' : ''}`}>
          <div className="upload-placeholder">
            <FaCloudUploadAlt className="upload-icon" />
            <span>{uploading ? 'Uploading...' : 'Click to upload image'}</span>
            <small>JPG, PNG or WEBP (Max 5MB)</small>
          </div>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange} 
            disabled={uploading}
            hidden 
          />
        </label>
      )}
    </div>
  );
};

export default FileUpload;
