import React, { useState } from 'react';
import { FaCloudUploadAlt, FaTimes, FaPlus } from 'react-icons/fa';
import imageCompression from 'browser-image-compression';
import { uploadImage } from '../services/api';
import './MultiImageUpload.css';

const MultiImageUpload = ({ onUploadSuccess, currentImages = [], maxImages = 3 }) => {
  const [uploading, setUploading] = useState(false);
  const [previews, setPreviews] = useState(currentImages || []);

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // Check if adding these files would exceed max limit
    if (previews.length + files.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images.`);
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = files.map(async (file) => {
        // 1. Compress the image before uploading
        const options = {
          maxSizeMB: 2,
          maxWidthOrHeight: 1920,
          useWebWorker: true
        };

        const compressedFile = await imageCompression(file, options);

        // 2. Upload the compressed image to server
        const formData = new FormData();
        formData.append('image', compressedFile, compressedFile.name || file.name);

        const { data } = await uploadImage(formData);
        const apiBase = import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL.replace(/\/api$/, '') : 'http://localhost:5000';
        return `${apiBase}${data.url}`;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      const newPreviews = [...previews, ...uploadedUrls];
      
      setPreviews(newPreviews);
      onUploadSuccess(newPreviews);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (index) => {
    const newPreviews = previews.filter((_, i) => i !== index);
    setPreviews(newPreviews);
    onUploadSuccess(newPreviews);
  };

  return (
    <div className="multi-image-upload">
      <div className="images-grid">
        {previews.map((url, index) => (
          <div key={index} className="image-item">
            <img src={url} alt={`Preview ${index + 1}`} />
            <button type="button" className="remove-btn" onClick={() => removeImage(index)}>
              <FaTimes />
            </button>
          </div>
        ))}
        
        {previews.length < maxImages && (
          <label className={`upload-slot ${uploading ? 'disabled' : ''}`}>
            <input 
              type="file" 
              accept="image/*" 
              multiple 
              onChange={handleFileChange} 
              disabled={uploading}
              hidden 
            />
            {uploading ? (
              <div className="loader">Uploading...</div>
            ) : (
              <div className="add-more">
                <FaPlus />
                <span>Add Photo</span>
              </div>
            )}
          </label>
        )}
      </div>
      <div className="upload-info">
        <span>{previews.length} / {maxImages} images uploaded</span>
      </div>
    </div>
  );
};

export default MultiImageUpload;
