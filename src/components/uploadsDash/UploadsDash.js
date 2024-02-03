import React from 'react';
import * as upDashStyles from "./uploadsDash.module.css"
import UploadHandler from './uploadService';
import RetriveFiles from './RetriveFiles';

const FileUpload = () => {
  

  return (
    <div className={upDashStyles.uploadsDash}>
        <UploadHandler />
        <RetriveFiles />

        <div className={upDashStyles.noUpload}>
          <div className='noUpload_inner'></div>
        </div>
    </div>
  );
};

export default FileUpload;
