import React from "react";
import upDashStyles from "./uploadsDash.module.css";
import documentIcon from "../../utils/icons/document.webp"

export default function DocumentTypeFile({fetchedFile}) {
  return (
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
  );
}
