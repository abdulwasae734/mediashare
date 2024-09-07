import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import './FileUpload.css'; // Import the CSS file

const db = getFirestore();

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [tag, setTag] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setUploadProgress(0);
    setUploadStatus("");
  };

  const handleTagChange = (e) => {
    setTag(e.target.value);
  };

  const handleUpload = () => {
    if (!file) return;

    const storageRef = ref(storage, `uploads/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
        setUploadStatus(`${Math.round(progress)}%`);
      },
      error => {
        console.error("Upload failed:", error);
        setUploadStatus("Upload failed");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          try {
            await addDoc(collection(db, "uploads"), {
              url: downloadURL,
              tag: tag,
              name: file.name
            });
            setUploadStatus("Uploaded");
            console.log("File metadata saved to Firestore");
          } catch (e) {
            console.error("Error adding document: ", e);
            setUploadStatus("Error");
          }
        });
      }
    );
  };

  return (
    <section className="file-upload">
      <h2>Upload Your File</h2>
      <div className="file-upload-content">
        <input 
          type="file" 
          onChange={handleFileChange} 
          className="file-input" 
        />
        <input 
          type="text" 
          placeholder="Enter a tag or description" 
          value={tag} 
          onChange={handleTagChange} 
          className="tag-input"
        />
        <button onClick={handleUpload} className="upload-button">Upload</button>
        {uploadProgress > 0 && (
          <div className="progress-container">
            <div 
              className="progress-bar" 
              style={{ width: `${uploadProgress}%` }}
            >
              {uploadStatus}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FileUpload;
