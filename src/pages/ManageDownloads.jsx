import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";
import './ManageDownloads.css'; // Import the CSS file

const ManageDownloads = () => {
  const [uploads, setUploads] = useState([]);
  const [previews, setPreviews] = useState({});
  const db = getFirestore();

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
  }, [db]);

  const handleDelete = async (id, fileName) => {
    // Delete the file from Firebase Storage
    const storageRef = ref(storage, `uploads/${fileName}`);
    try {
      await deleteObject(storageRef);
      console.log("File deleted from storage");
    } catch (error) {
      console.error("Error deleting file from storage:", error);
    }

    // Delete the file metadata from Firestore
    try {
      await deleteDoc(doc(db, "uploads", id));
      console.log("File metadata deleted from Firestore");

      // Update the UI to remove the deleted file
      setUploads(uploads.filter((upload) => upload.id !== id));
    } catch (error) {
      console.error("Error deleting document:", error);
    }
  };

  return (
    <section className="manage-downloads">
      <h2>Manage Downloads</h2>
      {uploads.length > 0 ? (
        <ul className="uploads-list">
          {uploads.map((upload) => (
            <li key={upload.id} className="upload-item">
              <div className="upload-content">
                <div className="upload-info">
                  <p><strong>File:</strong> <a href={upload.url} target="_blank" rel="noopener noreferrer" className="file-link">{upload.name}</a></p>
                  <p><strong>Tag:</strong> {upload.tag}</p>
                </div>
                <button onClick={() => handleDelete(upload.id, upload.name)} className="delete-button">Delete</button>
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

export default ManageDownloads;
