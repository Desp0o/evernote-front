import React, { useState, useContext } from 'react';
import upDashStyles from "./uploadsDash.module.css"
import { ProviderPass } from '../Provider';
import FetchedFiles from './fetchedFiles';
import axios from 'axios';
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
