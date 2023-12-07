import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Spinner from "../spinner/Sipnner";
import { ProviderPass } from "../Provider";
import upDashStyles from "./uploadsDash.module.css";
import ImageFile from "./ImageFile";
import VideoFile from "./VideoFile";
import DocumentTypeFile from "./DocumentTypeFile";

export default function RetriveFiles() {
  const { user } = useContext(ProviderPass);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchedFiles, setFetchedFiles] = useState([]);

  const getFilesHandler = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:3300/getfiles", {
        withCredentials: true,
        params: {
          user: user.email,
          uid: user.uid,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      setFetchedFiles(res.data);
      console.log(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFilesHandler();
  }, []);

  return (
    <div className={upDashStyles.retrieved_files}>
      {isLoading ? (
        <Spinner />
      ) : (
        fetchedFiles?.map((item) =>
          item.fileMimeType.startsWith("image") ? (
            <ImageFile fetchedItem={item} key={item.file} />
          ) : item.fileMimeType.startsWith("video") ? (
            <VideoFile fetchedFile={item} key={item.file} />
          ) : (
            <DocumentTypeFile fetchedFile={item} key={item.file} />
          )
        )
      )}
    </div>
  );
}
