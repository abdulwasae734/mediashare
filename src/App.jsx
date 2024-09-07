import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import FileUpload from './pages/FileUpload';
import ViewUploads from './pages/ViewUploads';
import ManageDownloads from './pages/ManageDownloads';
import './App.css';
import Layout from './layout/Layout'; // New Layout component
import Home from './pages/Home';
import PasswordPrompt from './pages/PasswordPrompt';

function App() {
  const [accessGranted, setAccessGranted] = useState(false);

  const handleAccessGranted = () => {
    setAccessGranted(true); // Grant access to the site
  };

  return (
    <div className='card'>
      {!accessGranted ? (
        // Pass the handleAccessGranted function correctly to PasswordPrompt
        <PasswordPrompt onAccessGranted={handleAccessGranted} />
      ) : (
        <Router>
          <Routes>
            {/* Define routes that will render based on the Layout */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="upload" element={<FileUpload />} />
              <Route path="view-uploads" element={<ViewUploads />} />
              <Route path="manage-downloads" element={<ManageDownloads />} />
            </Route>
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
