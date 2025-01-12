import React, { useState } from 'react';
import { storage } from '../../lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Button } from "@/components/ui/button";

interface FileUploaderProps {
  complaintId: string;
  onUploadComplete: (urls: string[]) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ complaintId, onUploadComplete }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prevFiles => [...prevFiles, ...newFiles].slice(0, 20));
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of files) {
        const fileRef = ref(storage, `complaints/${complaintId}/${file.name}`);
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        uploadedUrls.push(url);
      }
      onUploadComplete(uploadedUrls);
      setFiles([]);
    } catch (error) {
      console.error("Error uploading files:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mt-4">
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        accept="image/*,application/pdf"
        className="mb-2"
      />
      <div>{files.length} file(s) selected</div>
      <Button onClick={handleUpload} disabled={uploading || files.length === 0}>
        {uploading ? 'Uploading...' : 'Upload Files'}
      </Button>
    </div>
  );
};

export default FileUploader;

