import React from 'react';
import upDashStyles from "./uploadsDash.module.css"
import UploadHandler from './uploadService';
import RetriveFiles from './RetriveFiles';

const FileUpload = () => {
  

  return (
    <div className={upDashStyles.uploadsDash}>
        <UploadHandler />
        <RetriveFiles />
    </div>
  );
};

export default FileUpload;
