import React, {useState, useContext} from "react";
import upDashStyles from "./uploadsDash.module.css";
import documentIcon from "../../utils/icons/document.webp"
import trashCan from "../../utils/icons/delete.webp"
import { ProviderPass } from "../Provider";

export default function DocumentTypeFile({fetchedFile, funName}) {

  const {setIsFetchingFiles} = useContext(ProviderPass)

  return (
    <div className={upDashStyles.document_type_fetched_file_container}>
      <img className={upDashStyles.trash_can} src={trashCan} alt="delete trash can" onClick={funName}/>
    <a
      href={`${process.env.REACT_APP_FETCHED_FILE_PATH}${fetchedFile.file}`}
      target="_blank"
      className={upDashStyles.document_type_fetched_file}
    >
      
      <p className={upDashStyles.document_file_title}>
        {fetchedFile.originalName.substring(0, 40)}
      </p>
      <img
        src={documentIcon}
        alt="document donwload"
        className={upDashStyles.document_file_style}
      />
    </a>
    </div>
  );
}
