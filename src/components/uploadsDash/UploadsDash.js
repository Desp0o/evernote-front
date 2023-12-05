import React, { useState, useContext } from 'react';
import upDashStyles from "./uploadsDash.module.css"
import { ProviderPass } from '../Provider';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const {user} = useContext(ProviderPass)

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      console.error('Please select a file.');
      return;
    }

    // Dummy user and fileUid for demonstration
    

    const body = {
      user: user.email,
      fileUid : user.uid,
      file: file
    }

    try {
      const response = await axios.post('http://localhost:3300/uploadfile', body, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className={upDashStyles.uploadsDash}>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
    </div>
  );
};

export default FileUpload;
