import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";
import './ViewUploads.css'; // Import the CSS file

const db = getFirestore();

const ViewUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [previews, setPreviews] = useState({});
  
  useEffect(() => {
    const fetchUploads = async () => {
      const querySnapshot = await getDocs(collection(db, "uploads"));
      const files = [];
      querySnapshot.forEach((doc) => {
        files.push({ id: doc.id, ...doc.data() });
      });
      setUploads(files);

      // Fetch previews for images
      files.forEach(async (file) => {
        const fileRef = ref(storage, `uploads/${file.name}`);
        try {
          const url = await getDownloadURL(fileRef);
          // Check if the file is an image based on its URL
          if (file.name.match(/\.(jpg|jpeg|png|gif)$/i)) {
            setPreviews((prevPreviews) => ({ ...prevPreviews, [file.id]: url }));
          }
        } catch (error) {
          console.error("Error fetching preview:", error);
        }
      });
    };

    fetchUploads();
  });

  return (
    <section className="view-uploads">
      <h2>Uploaded Files</h2>
      {uploads.length > 0 ? (
        <ul className="uploads-list">
          {uploads.map((upload) => (
            <li key={upload.id} className="upload-item">
              <div className="upload-content">
                <div className="upload-info">
                  <p><strong>File:</strong> <a href={upload.url} target="_blank" rel="noopener noreferrer" className="file-link">{upload.name}</a></p>
                  <p><strong>Tag:</strong> {upload.tag}</p>
                </div>
                <a href={upload.url} download className="download-button">Download</a>
              </div>
              {previews[upload.id] && (
                <div className="file-preview">
                  <img src={previews[upload.id]} alt={upload.name} className="preview-image" />
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No uploads found.</p>
      )}
    </section>
  );
};

export default ViewUploads;
