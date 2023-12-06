import React, { useState, useContext } from "react";
import upDashStyles from "./uploadsDash.module.css";
import { ProviderPass } from "../Provider";
import axios from "axios";

import yMark from "../../utils/icons/yes-mark.webp"
import Uploading from "../Uploading/Uploading";

const UploadHandler = () => {
  const [file, setFile] = useState(null);
  const { user } = useContext(ProviderPass);

  const [isUploading, setIsUploading] = useState(false)

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    setIsUploading(true)


    const body = {
      user: user.email,
      fileUid: user.uid,
      file: file,
    };

    try {
      const response = await axios.post(
        "http://localhost:3300/uploadfile",
        body,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setIsUploading(false)
      console.log(response.data);
    } catch (error) {
      setIsUploading(false)
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className={upDashStyles.upload_container_wraper}>
      <div className={upDashStyles.upload_input_container}>
        <div className={upDashStyles.custom_upload_btn}>Choose File</div>
        <input
          type="file"
          onChange={handleFileChange}
          className={upDashStyles.upload_input_style}
        />
      </div>

      {isUploading ? <Uploading text='Uploading . . .' /> : 
      file ? <>
        <img src={yMark} alt="y mark" className={upDashStyles.yes_mark} />
  
        <div className={upDashStyles.send_btn_active} onClick={handleUpload}>Upload File</div>
        </> :
          <p>Choose file</p>
        }

      
    </div>
  );
};

export default UploadHandler;
