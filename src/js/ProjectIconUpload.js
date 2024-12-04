import { useState } from 'react';
import { uploadProjectIcon } from './SupabaseClient';

function ProjectIconUpload({ projectId, onUploadComplete }) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (event) => {
    try {
      const file = event.target.files[0];
      
      // Basic validation
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      setUploading(true);
      
      // Upload the file
      const filePath = await uploadProjectIcon(projectId, file);
      
      // Notify parent component of successful upload
      onUploadComplete?.(filePath);
      
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={uploading}
      />
      {uploading && <span>Uploading...</span>}
    </div>
  );
}