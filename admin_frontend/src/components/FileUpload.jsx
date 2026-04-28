import React, { useState } from 'react';
import { FaCloudUploadAlt, FaTimes } from 'react-icons/fa';
import imageCompression from 'browser-image-compression';
import { uploadImage } from '../services/api';
import './FileUpload.css';

const FileUpload = ({ onUploadSuccess, currentImage }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage || '');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show preview immediately for better UX
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);

    setUploading(true);

    try {
      // 1. Compress the image before uploading
      const options = {
        maxSizeMB: 5,            // Compress to under 5MB
        maxWidthOrHeight: 1920,  // Scale down if larger than 1080p width
        useWebWorker: true       // Use web worker to not block UI thread
      };

      console.log(`Original file size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
      const compressedFile = await imageCompression(file, options);
      console.log(`Compressed file size: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);

      // 2. Upload the compressed image to server
      const formData = new FormData();
      formData.append('image', compressedFile, compressedFile.name || file.name);

      const { data } = await uploadImage(formData);
      const apiBase = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5000';
      const fullUrl = `${apiBase}${data.url}`;
      
      // Update parent first, then set preview
      onUploadSuccess(fullUrl);
      setPreview(fullUrl);
    } catch (error) {
      console.error('Upload failed:', error);
      // If upload fails, clear the preview since it's not valid on server
      setPreview(''); 
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
            <span>{uploading ? 'Compressing & Uploading...' : 'Click to upload image'}</span>
            <small>JPG, PNG or WEBP — Any size, auto-compressed to 5MB</small>
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
