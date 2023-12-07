import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Spinner from "../spinner/Sipnner";
import { ProviderPass } from "../Provider";
import upDashStyles from "./uploadsDash.module.css";
import ImageFile from "./ImageFile";
import VideoFile from "./VideoFile";
import DocumentTypeFile from "./DocumentTypeFile";

export default function RetriveFiles() {
  const { user, FetchedFilesLoading, getFilesHandler, fetchedFiles } =
    useContext(ProviderPass);
  const [isLoading, setIsLoading] = useState(false);
  // const [fetchedFiles, setFetchedFiles] = useState([]);

  // const getFilesHandler = async () => {
  //   setIsLoading(true);
  //   try {
  //     const res = await axios.get("http://localhost:3300/getfiles", {
  //       withCredentials: true,
  //       params: {
  //         user: user.email,
  //         uid: user.uid,
  //       },
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     setFetchedFiles(res.data);
  //     console.log(res.data);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.log(error);
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    getFilesHandler();
  }, []);

  const deleteFile = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3300/deletefiles/${id}`,
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
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={upDashStyles.retrieved_files}>
      

      {fetchedFiles.length === 0 ? (
        <p className={upDashStyles.empty_files_container}>You Have No Files</p>
      ) : FetchedFilesLoading ? (
        <Spinner />
      ) : (
        fetchedFiles?.map((item) =>
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
