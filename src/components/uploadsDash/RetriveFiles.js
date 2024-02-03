import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Spinner from "../spinner/Sipnner";
import { ProviderPass } from "../Provider";
import * as upDashStyles from "./uploadsDash.module.css";
import ImageFile from "./ImageFile";
import VideoFile from "./VideoFile";
import DocumentTypeFile from "./DocumentTypeFile";

export default function RetriveFiles() {
  const { user, FetchedFilesLoading, getFilesHandler, fetchedFiles } =
    useContext(ProviderPass);

  useEffect(() => {
    getFilesHandler();
  }, []);

  const deleteFile = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_DELETE_FILE}${id}`,
        {
          withCredentials: true,
          params: {
            id: id,
            file: id.file,
            uid: user.uid,
          },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      getFilesHandler();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={upDashStyles.retrieved_files}>
      

      {fetchedFiles?.length === 0 ? (
        // <p className={upDashStyles.empty_files_container}>You Have No Files</p>
        <p className={upDashStyles.empty_files_container}>Not In Free Mode</p>
      ) : FetchedFilesLoading ? (
        <Spinner />
      ) : (
        fetchedFiles && fetchedFiles?.map((item) =>
          item.fileMimeType.startsWith("image") ? (
            <ImageFile
              fetchedItem={item}
              key={item.file}
              funName={(e) => deleteFile(item.id)}
            />
          ) : item.fileMimeType.startsWith("video") ? (
            <VideoFile
              fetchedFile={item}
              key={item.file}
              funName={(e) => deleteFile(item.id)}
            />
          ) : (
            <DocumentTypeFile
              fetchedFile={item}
              key={item.file}
              funName={(e) => deleteFile(item.id)}
            />
          )
        )
      )}
    </div>
  );
}
