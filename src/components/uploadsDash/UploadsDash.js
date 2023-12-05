import React, { useContext, useState } from 'react'
import {ProviderPass} from "../Provider"
import axios from 'axios'
import "./uploadsDash.css"

export default function UploadsDash() {
  const {user} = useContext(ProviderPass)

  const [uploadFile, setUploadFile] = useState('')

  const fileHandler = (e) => {
    setUploadFile(e.target.files[0])
}

const sendFile = async () => {
  const formData = new FormData();
  formData.append("user", user);
  formData.append("file", uploadFile);
  console.log(formData);

  try {
    console.log(user.email);
    const response = await axios.post('http://localhost:3300/uploadfile', formData, { withCredentials: true, headers: {'Content-Type': 'multipart/form-data',} });

    console.log(res.data);
  } catch (error) {
    console.log(error.response);
  }
};

  return (
    <div className='uploadsDash'>

      <input type='file' name='file' onChange={fileHandler} />
      <button onClick={sendFile}>add</button>
    </div>
  )
}
